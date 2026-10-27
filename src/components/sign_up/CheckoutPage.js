import React, { Component, useEffect, useRef, useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ThreeDotLoader from "../shared/three-dot-loader";
import { completeClassSignupPayment } from "./api";
import CheckoutHelp from "./CheckoutHelp";
import { waitForCheckout, UNKNOWN_PAYMENT_MESSAGE } from "./checkoutProgress";

import { loadStripe } from "@stripe/stripe-js";

// most likely passed from Stripe
const CardError = ({ cardError }) => {
  const error = {
    message: cardError.message,
    code: cardError.code,
    doc_url: cardError.doc_url,
    param: cardError.param,
    charge: cardError.charge,
  };

  return (
    <div className="card-error">
      <p className="card-error__message">{error.message}</p>
      <details>
        <summary>Details</summary>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </details>
    </div>
  );
};

export const CheckoutForm = props => {
  const submitting = useRef(false);
  const mounted = useRef(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState("");
  const [paymentUncertain, setPaymentUncertain] = useState(false);
  const [cardError, setCardError] = useState();
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const [cardReady, setCardReady] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (cardReady) return;
    const timer = setTimeout(() => {
      setProgress(
        "The card form is taking longer than expected to load. No payment has been submitted. Contact admissions for help with this registration."
      );
    }, 20000);
    return () => clearTimeout(timer);
  }, [cardReady]);

  const wait = (operation, message) =>
    waitForCheckout(operation, () => {
      if (mounted.current) setProgress(message);
    });

  const getBillingDetails = () => {
    const {
      parentState: { values: formValues },
    } = props;

    return {
      name: `${formValues.parent_first} ${formValues.parent_last}`,
      email: formValues.parent_email,
      phone: formValues.parent_phone,
      address: {
        line1: formValues.address1,
        line2: formValues.address2,
        city: formValues.city,
        state: formValues.state,
        postal_code: formValues.zip_code,
        country: "US",
      },
    };
  };

  const handleCardChange = async event => {
    setCardComplete(event.complete);
    if (event.error) setCardError(event.error);

    if (event.complete) {
      try {
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardElement,
          billing_details: getBillingDetails(),
        });

        if (!error && paymentMethod) {
          setIsCreditCard(paymentMethod.card?.funding === "credit");
        }
      } catch (error) {
        console.error("Error detecting card type:", error);
      }
    }
  };

  const calculateTotal = () => {
    const baseAmount = parseFloat(
      props.parentState.values.price_shown_to_customer
    );
    if (isCreditCard && baseAmount > 0) {
      const fee = baseAmount * 0.03;
      return (baseAmount + fee).toFixed(2);
    }
    return baseAmount.toFixed(2);
  };

  const calculateFee = () => {
    const baseAmount = parseFloat(
      props.parentState.values.price_shown_to_customer
    );
    if (isCreditCard && baseAmount > 0) {
      return (baseAmount * 0.03).toFixed(2);
    }
    return "0.00";
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    if (submitting.current || !stripe || !elements) return;
    submitting.current = true;
    setIsSubmitting(true);
    setCardError(null);
    let paymentSucceeded = false;
    let chargeSubmitted = false;
    let retryAllowed = false;
    setProgress("Checking card details...");

    try {
      if (!Number.isSafeInteger(props.paymentId) || props.paymentId <= 0) {
        setCardError({
          message:
            "The signup payment is missing. Please contact The Coding Space for a payment link.",
        });
        return;
      }
      const cardElement = elements.getElement(CardElement);

      // Create payment method to detect card type
      const { paymentMethod, error: paymentMethodError } = await wait(
        () =>
          stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
            billing_details: getBillingDetails(),
          }),
        "Card verification is taking longer than expected. Keep this page open; no payment request has been sent to Dashboard yet."
      );

      if (!mounted.current) return;

      if (paymentMethodError) {
        setCardError(paymentMethodError);
        console.error(paymentMethodError);
        return;
      }

      // Check if it's a credit card
      const isCreditCard = paymentMethod.card?.funding === "credit";

      // Pay the reservation created on Confirm; never create another signup here.
      chargeSubmitted = true;
      setProgress(
        "Processing payment. Please keep this page open and do not submit again."
      );
      const res = await wait(
        () =>
          completeClassSignupPayment(props.paymentId, {
            apply_credit_card_fee: isCreditCard,
            payment_method_id: paymentMethod.id,
          }),
        "Payment is taking longer than expected. Its status is not confirmed. Keep this page open and do not submit another payment; contact admissions if it does not finish."
      );

      if (!mounted.current) return;

      if (res.nextStep === "requires_action" && res.paymentIntent) {
        // Handle 3DS authentication
        setProgress(
          "Complete your bank's verification to finish payment. Please keep this page open."
        );
        const { error: confirmError } = await wait(
          () => stripe.confirmCardPayment(res.paymentIntent.client_secret),
          "We are still waiting for bank verification. Do not submit another payment. Complete the verification window, or contact admissions if it is not visible."
        );

        if (!mounted.current) return;

        if (confirmError) {
          retryAllowed =
            confirmError.payment_intent?.status === "requires_payment_method";
          setCardError(confirmError);
          return;
        }

        // After successful 3DS, verify payment completed and then redirect
        const { paymentIntent, error: retrieveError } = await wait(
          () => stripe.retrievePaymentIntent(res.paymentIntent.client_secret),
          UNKNOWN_PAYMENT_MESSAGE
        );

        if (!mounted.current) return;

        if (retrieveError) {
          setCardError(retrieveError);
        } else if (paymentIntent?.status === "succeeded") {
          paymentSucceeded = true;
          props.onSuccessRedirect(res.adsTracking);
        } else {
          retryAllowed = paymentIntent?.status === "requires_payment_method";
          setCardError({
            message: retryAllowed
              ? "Payment authentication failed. You can try another card on this page."
              : UNKNOWN_PAYMENT_MESSAGE,
          });
        }
      } else if (res.nextStep === "send_confirmation") {
        paymentSucceeded = true;
        props.onSuccessRedirect(res.adsTracking);
      } else {
        throw new Error("Next step unknown!");
      }
    } catch (error) {
      if (!mounted.current) return;
      retryAllowed =
        error.status === 422 && error.body?.code === "card_declined";
      if (error.status === 422 || error.status === 409) {
        setCardError({
          message:
            error.message || "Please check your information and try again.",
        });
      } else {
        setCardError({
          message: chargeSubmitted
            ? UNKNOWN_PAYMENT_MESSAGE
            : "Card verification could not finish. No payment request was sent to Dashboard. Please try again on this page.",
        });
      }
      console.error("Checkout request failed", {
        paymentId: props.paymentId,
        status: error.status,
        chargeSubmitted,
      });
    } finally {
      // Keep Purchase locked after success while navigation finishes.
      if (
        mounted.current &&
        !paymentSucceeded &&
        chargeSubmitted &&
        !retryAllowed
      ) {
        setPaymentUncertain(true);
        setProgress(UNKNOWN_PAYMENT_MESSAGE);
        setIsSubmitting(false);
      } else if (mounted.current && !paymentSucceeded) {
        submitting.current = false;
        setIsSubmitting(false);
        setProgress("");
      }
    }
  };

  const baseAmount = parseFloat(
    props.parentState.values.price_shown_to_customer
  );
  const feeAmount = calculateFee();
  const totalAmount = calculateTotal();

  return (
    <div className="card-checkout">
      <div className="payment-reminder">
        <p>
          Please note that payments using a credit card will incur a 3%
          processing fee. To avoid this fee you can use a debit card, which will
          remain as a no-fee option.
        </p>
      </div>
      <div>
        Card details
        <CardElement
          onChange={handleCardChange}
          onReady={() => {
            setCardReady(true);
            setProgress("");
          }}
        />
      </div>
      {!!cardError && cardError.message !== progress && (
        <CardError cardError={cardError} />
      )}
      {!!progress && (
        <p role="status" aria-live="polite">
          {progress}
        </p>
      )}
      {(cardError || progress) && <CheckoutHelp paymentId={props.paymentId} />}

      <div className="payment-summary">
        <div className="payment-breakdown">
          <div className="payment-row">
            <span>Base Amount:</span>
            <span>${baseAmount.toFixed(2)}</span>
          </div>
          {isCreditCard && baseAmount > 0 && (
            <div className="payment-row fee-row">
              <span>Credit Card Fee (3%): </span>
              <span>${feeAmount}</span>
            </div>
          )}
          <div className="payment-row total-row">
            <strong>Total:</strong>
            <strong>${totalAmount}</strong>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={
          isSubmitting ||
          paymentUncertain ||
          !cardComplete ||
          !stripe ||
          !elements
        }
        style={{ display: "flex", justifyContent: "center" }}
      >
        Purchase for ${totalAmount} {isSubmitting && <ThreeDotLoader />}
      </button>
      <small>
        This charge will be billed by <em>Private Prep LLC</em>.
        {baseAmount > 0 && (
          <span> A 3% credit card processing fee applies to credit cards.</span>
        )}
      </small>
    </div>
  );
};

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      stripePromise: null,
      loadError: null,
    };
    this.loadVersion = 0;
  }

  componentDidMount() {
    this.initializeStripe();
  }

  componentDidUpdate(prevProps) {
    if (this.props.stripePublicKey !== prevProps.stripePublicKey) {
      this.initializeStripe();
    }
  }

  componentWillUnmount() {
    this.loadVersion += 1;
    clearTimeout(this.loadTimer);
  }

  initializeStripe() {
    const version = ++this.loadVersion;
    clearTimeout(this.loadTimer);
    this.setState({ stripePromise: null, loadError: null });
    const message =
      "The payment form could not load. No payment has been submitted from this page. Contact admissions for help with this registration.";
    if (!this.props.stripePublicKey) {
      this.setState({ loadError: message });
      return;
    }
    this.loadTimer = setTimeout(
      () => this.setState({ loadError: message }),
      20000
    );
    return Promise.resolve()
      .then(() => loadStripe(this.props.stripePublicKey))
      .then(stripe => {
        if (version !== this.loadVersion) return;
        clearTimeout(this.loadTimer);
        this.setState({
          stripePromise: stripe,
          loadError: stripe ? null : message,
        });
      })
      .catch(() => {
        if (version !== this.loadVersion) return;
        clearTimeout(this.loadTimer);
        this.setState({ loadError: message });
      });
  }

  render() {
    if (this.state.loadError) {
      return (
        <div className="checkout-page">
          <h2 className="title">Card Payment</h2>
          <p role="alert">{this.state.loadError}</p>
          <CheckoutHelp paymentId={this.props.paymentId} />
        </div>
      );
    }

    if (!this.state.stripePromise) {
      return (
        <div className="checkout-page">
          <h2 className="title">Card Payment</h2>
          <div>Initializing payment form...</div>
          <ThreeDotLoader />
        </div>
      );
    }

    return (
      <div className="checkout-page">
        <h2 className="title">Card Payment</h2>
        <Elements stripe={this.state.stripePromise}>
          <CheckoutForm {...this.props} />
        </Elements>
      </div>
    );
  }
}

export default CheckoutPage;
