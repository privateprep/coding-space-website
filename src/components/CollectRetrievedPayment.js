import React, { Component, useState } from "react";
import { navigate } from "gatsby";
import { GET } from "../utils/service";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ErrorEmailRedirection from "./ErrorEmailRedirection";
import ThreeDotLoader from "./shared/three-dot-loader";

import { loadStripe } from "@stripe/stripe-js";

// NOTE: 'just' for cart recovery
// This is separate from the typical sign_up flow

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
      <ErrorEmailRedirection />
      <details>
        <summary>Details</summary>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </details>
    </div>
  );
};

const CheckoutForm = props => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cardError, setCardError] = useState();
  const [isCreditCard, setIsCreditCard] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const getBillingDetails = () => {
    const { clientInfo } = props;
    return {
      name: `${clientInfo.parentFirst} ${clientInfo.parentLast}`,
      email: clientInfo.parentEmail,
      phone: clientInfo.parentPhone,
      address: {
        line1: clientInfo.address1,
        line2: clientInfo.address2,
        city: clientInfo.city,
        state: clientInfo.state,
        postal_code: clientInfo.zipCode,
        country: "US",
      },
    };
  };

  const handleCardChange = async (event) => {
    setCardComplete(event.complete);

    if (event.complete) {
      try {
        const cardElement = elements.getElement(CardElement);
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: 'card',
          card: cardElement,
          billing_details: getBillingDetails(),
        });

        if (!error && paymentMethod) {
          setIsCreditCard(paymentMethod.card?.funding === 'credit');
        }
      } catch (error) {
        console.error('Error detecting card type:', error);
      }
    }
  };

  const calculateTotal = () => {
    const baseAmount = parseFloat(props.baseAmount);
    if (isCreditCard && baseAmount > 0) {
      const fee = baseAmount * 0.03;
      return (baseAmount + fee).toFixed(2);
    }
    return baseAmount.toFixed(2);
  };

  const calculateFee = () => {
    const baseAmount = parseFloat(props.baseAmount);
    if (isCreditCard && baseAmount > 0) {
      return (baseAmount * 0.03).toFixed(2);
    }
    return "0.00";
  };

  const handleSubmit = async ev => {
    ev.preventDefault();
    setIsSubmitting(true);
    setCardError(null);
    try {
      const cardElement = elements.getElement(CardElement);
      const billingDetails = getBillingDetails();
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails,
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError);
        setIsSubmitting(false);
        console.error(paymentMethodError);
        return;
      }

      // "Deferred Payment Intent" flow for adding charges to a cart
      // See https://docs.stripe.com/payments/accept-a-payment-deferred
      // Check if it's a credit card
      const isCreditCard = paymentMethod.card?.funding === 'credit';

      // Call backend to create payment intent and finalize signup
      const signupParams = {
        ...props.clientInfo,
        ...props.classInfo,
        baseAmount: props.baseAmount,
        signupId: props.signupId,
        paymentId: props.paymentId,
        apply_credit_card_fee: isCreditCard,
        create_payment_intent: true,
        payment_method_id: paymentMethod.id,
        submitting_form: true,
      };

      const res = await fetch(`${process.env.DASHBOARD_BASE_URL}/services/class_signups/${props.paymentId}/complete_abandoned_cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupParams),
      });

      const result = await res.json();


      if (result.nextStep === "requires_action" && result.paymentIntent) {
        const { error: confirmError } = await stripe.confirmCardPayment(
          result.paymentIntent.client_secret
        );

        if (confirmError) {
          setCardError(confirmError);
          setIsSubmitting(false);
          return;
        }

        const { paymentIntent } = await stripe.retrievePaymentIntent(
          result.paymentIntent.client_secret
        );

        if (paymentIntent.status === 'succeeded') {
          props.onSuccessRedirect(result.adsTracking);
        } else {
          setCardError({ message: "Payment authentication failed. Please try again." });
          setIsSubmitting(false);
        }
      } else if (result.nextStep === "send_confirmation") {
        props.onSuccessRedirect(result.adsTracking);
      } else {
        throw new Error("Next step unknown!");
      }
    } catch (error) {
      if (error.status === 422) {
        setCardError({ message: "Please check your information and try again." });
      } else {
        setCardError({ message: "An unexpected error occurred. Please try again." });
      }
      setIsSubmitting(false);
      console.error(error);
    }
  };

  const baseAmount = parseFloat(props.baseAmount);
  const feeAmount = calculateFee();
  const totalAmount = calculateTotal();

  return (
    <div className="card-checkout">
      <div className="payment-reminder">
        <p>Please note that payments using a credit card will incur a 3% processing fee. To avoid this fee you can use a debit card, which will remain as a no-fee option.</p>
      </div>
      <div>
        Card details
        <CardElement onChange={handleCardChange} />
      </div>
      {!!cardError && <CardError cardError={cardError} />}

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
        className="button"
        onClick={handleSubmit}
        disabled={isSubmitting || !cardComplete}
        style={{ display: "flex", justifyContent: "center" }}
      >
        Purchase for ${totalAmount}{" "}
        {isSubmitting && <ThreeDotLoader />}
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

class CollectRetrievedPayment extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      stripePublicKey: null,
      stripePromise: null,
      clientInfo: {},
      classInfo: {},
      baseAmount: null,
      signupId: null,
      paymentId: null,
    };
  }

  componentDidMount() {
    this.retrieveClientAndClassInfo();
  }

  retrieveClientAndClassInfo = async () => {
    this.setState(() => ({ isLoading: true }));

    try {
      // Get class signup info
      const response = await GET(
        `${process.env.DASHBOARD_BASE_URL}/services/class_signups/${this.props.paymentId}/retrieve`
      );
      this.setState({
        isLoading: false,
        clientInfo: response.clientInfo || {},
        classInfo: response.class_info || {},
        stripePublicKey: response.stripePublicKey,
        baseAmount: response.baseAmount,
        signupId: response.signupId,
        paymentId: response.paymentId,
        stripePromise: loadStripe(response.stripePublicKey)
      });
    } catch (error) {
      console.error('Failed to retrieve client and class info:', error);
      this.setState(() => ({ isLoading: false }));
    }
  };

  onSuccessRedirect = (adsTracking) => {
    navigate("/thank_you", {
      replace: true,
      state: { adsTracking: adsTracking }
    });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="collect-payment-page">
          <ThreeDotLoader />
        </div>
      );
    }

    if (!this.state.stripePublicKey) {
      return (
        <div className="collect-payment-page">
          <h2 className="title">Card Payment</h2>
          <div>Loading payment form...</div>
          <ThreeDotLoader />
        </div>
      );
    }

    if (!this.state.stripePromise) {
      return (
        <div className="collect-payment-page">
          <h2 className="title">Card Payment</h2>
          <div>Initializing payment form...</div>
          <ThreeDotLoader />
        </div>
      );
    }

    return (
      <div className="collect-payment-page component">
        <h1 className="title">Checkout</h1>
        <p>{this.state.classInfo.memo}</p>
        <Elements stripe={this.state.stripePromise}>
          <CheckoutForm
            clientInfo={this.state.clientInfo}
            classInfo={this.state.classInfo}
            baseAmount={this.state.baseAmount}
            signupId={this.state.signupId}
            paymentId={this.state.paymentId}
            onSuccessRedirect={this.onSuccessRedirect}
          />
        </Elements>
      </div>
    );
  }
}

export default CollectRetrievedPayment;
