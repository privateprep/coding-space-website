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

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async ev => {
    ev.preventDefault(); // no page refresh
    setIsSubmitting(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      props.paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: props.billingDetails || {},
        },
      }
    );

    if (error) {
      setCardError(error);
      setIsSubmitting(false);
      console.error(error);
    } else if (paymentIntent) {
      props.onSuccessRedirect();
    }
  };

  return (
    <div className="card-checkout">
      <div>
        Card details
        <CardElement />
      </div>
      {!!cardError && <CardError cardError={cardError} />}
      <button
        className="button"
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{ display: "flex", justifyContent: "center" }}
      >
        Purchase for {props.paymentDetails.amount}{" "}
        {isSubmitting && <ThreeDotLoader />}
      </button>
    </div>
  );
};

class CollectRetrievedPayment extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      stripePromise: null, // magic sauce
      paymentContext: {}, // details loaded from backend
    };
  }

  componentDidMount() {
    this.retrievePaymentAndPrepStripe();
  }

  retrievePaymentAndPrepStripe = async () => {
    this.setState(() => ({ isLoading: true }));
    const res = await GET(
      `${process.env.DASHBOARD_BASE_URL}/services/payments/${this.props.paymentId}/retrieve`
    );
    this.setState(() => ({
      isLoading: false,
      paymentContext: res,
      stripePromise: loadStripe(res.stripePublicKey),
    }));
  };

  onSuccessRedirect = () => {
    navigate("/thank_you", { replace: true });
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="collect-payment-page">
          <ThreeDotLoader />
        </div>
      );
    }

    return (
      <div className="collect-payment-page component">
        <h1 className="title">Checkout</h1>
        <p>{this.state.paymentContext.paymentDetails.memo}</p>
        <Elements stripe={this.state.stripePromise}>
          <CheckoutForm
            {...this.state.paymentContext}
            onSuccessRedirect={this.onSuccessRedirect}
          />
        </Elements>
      </div>
    );
  }
}

export default CollectRetrievedPayment;
