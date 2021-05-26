import React, { Component, useState } from "react";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ErrorEmailRedirection from "../ErrorEmailRedirection";
import ThreeDotLoader from "../shared/three-dot-loader";

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

  const handleSubmit = async ev => {
    ev.preventDefault(); // no page refresh
    setIsSubmitting(true);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      props.paymentIntent.client_secret,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: getBillingDetails(),
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
        onClick={handleSubmit}
        disabled={isSubmitting}
        style={{ display: "flex", justifyContent: "center" }}
      >
        Purchase for {`$${props.parentState.values.price_shown_to_customer}`}{" "}
        {isSubmitting && <ThreeDotLoader />}
      </button>
      <small>
        This charge will be billed by <em>Private Prep LLC</em>.
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
    this.setState({ stripePromise: loadStripe(this.props.stripePublicKey) });
  }

  render() {
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
