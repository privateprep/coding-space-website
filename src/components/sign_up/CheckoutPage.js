import React, { Component, useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ErrorEmailRedirection from "../ErrorEmailRedirection";
import ThreeDotLoader from "../shared/three-dot-loader";
import { signupForClass } from "./api";

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
    const baseAmount = parseFloat(props.parentState.values.price_shown_to_customer);
    if (isCreditCard && baseAmount > 0) {
      const fee = baseAmount * 0.03;
      return (baseAmount + fee).toFixed(2);
    }
    return baseAmount.toFixed(2);
  };

  const calculateFee = () => {
    const baseAmount = parseFloat(props.parentState.values.price_shown_to_customer);
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
      const formValues = props.parentState.values;
      const cardElement = elements.getElement(CardElement);

      // Create payment method to detect card type
      const { paymentMethod, error: paymentMethodError } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: getBillingDetails(),
      });

      if (paymentMethodError) {
        setCardError(paymentMethodError);
        setIsSubmitting(false);
        console.error(paymentMethodError);
        return;
      }

      // Check if it's a credit card
      const isCreditCard = paymentMethod.card?.funding === 'credit';

      // Call backend to create payment intent and finalize signup
      const signupParams = {
        ...formValues,
        apply_credit_card_fee: isCreditCard,
        create_payment_intent: true,
        payment_method_id: paymentMethod.id,
        submitting_form: true,
      };

      const res = await signupForClass(signupParams);

      if (res.nextStep === "send_confirmation") {
        // Backend has created payment intent and processed payment
        props.onSuccessRedirect(res.adsTracking);
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

  const baseAmount = parseFloat(props.parentState.values.price_shown_to_customer);
  const feeAmount = calculateFee();
  const totalAmount = calculateTotal();

  return (
    <div className="card-checkout">
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
              <span>Credit Card Fee (3%):</span>
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

class CheckoutPage extends Component {
  constructor() {
    super();
    this.state = {
      stripePromise: null,
    };
  }

  componentDidMount() {
    if (this.props.stripePublicKey) {
      this.setState({ stripePromise: loadStripe(this.props.stripePublicKey) });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.stripePublicKey && this.props.stripePublicKey !== prevProps.stripePublicKey) {
      this.setState({ stripePromise: loadStripe(this.props.stripePublicKey) });
    }
  }

  render() {
    if (!this.props.stripePublicKey) {
      return (
        <div className="checkout-page">
          <h2 className="title">Card Payment</h2>
          <div>Loading payment form...</div>
          <ThreeDotLoader />
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
