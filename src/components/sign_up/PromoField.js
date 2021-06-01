import React, { useState } from "react";
import ThreeDotLoader from "../shared/three-dot-loader";

import { parentEmail } from "./formFields";
import FormField from "./FormField";

const defaultPromoMsg = {
  type: "info",
  message: "Enter your code and click 'APPLY'",
};

const requireEmailMsg = "requires an email";

const PromoField = ({
  applyPromo,
  appliedPromoAmount,
  appliedPromoCode,
  clearPromoPricing,
}) => {
  const [showInput, setShowInput] = useState(!!appliedPromoAmount);
  const [showParentEmail, setShowParentEmail] = useState(false);
  const [promoCode, setPromoCode] = useState(appliedPromoCode || "");
  const [isLoading, setIsLoading] = useState(false);
  const [promoMessage, setPromoMessage] = useState(defaultPromoMsg);

  const applyCode = async () => {
    if (!promoCode) return; // just to be safe... button should be disabled otherwise

    setIsLoading(true);
    setPromoMessage(); // clear last message

    try {
      await applyPromo(promoCode); // success handled in OverviewPage
      setPromoMessage({
        type: "success",
        message: `Your code has been applied!`,
      });
    } catch (error) {
      if (error.status === 422) {
        if (error.body.message.includes(requireEmailMsg)) {
          setShowParentEmail(true);
          setPromoMessage({
            type: "error",
            message: `${error.body.message}.\nEnter your email, and then click 'APPLY'`,
          });
        } else {
          setPromoMessage({
            type: "error",
            message: error.body.message,
          });
        }
        clearPromoPricing();
      } else if (error.status === 404) {
        setPromoMessage({
          type: "error",
          message: `Sorry, we couldn't find a promotion matching code '${promoCode}'`,
        });
        clearPromoPricing();
      } else {
        throw error; // something else happened let HB know
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!showInput) {
    return (
      <button
        disabled={isLoading}
        className="small-button"
        type="button"
        onClick={() => setShowInput(true)}
      >
        ENTER PROMO
      </button>
    );
  }

  const submitDisabled = isLoading || !promoCode;

  return (
    <div className="promo-lookup">
      <label htmlFor="promoCode" style={{ fontWeight: "bold" }}>
        Promo Code
      </label>
      <div className="input-wrapper">
        <input
          id="promoCode"
          type="text"
          value={promoCode}
          onChange={event => setPromoCode(event.target.value)}
        />
        {!!promoMessage && (
          <div className={`promo-message promo-message--${promoMessage.type}`}>
            {promoMessage.message}
          </div>
        )}
        {showParentEmail && (
          <div className="parent-email-wrapper">
            <FormField field={{ ...parentEmail, label: "Parent Email" }} />
          </div>
        )}
        <button
          disabled={submitDisabled}
          className={`small-button ${
            submitDisabled ? "small-button--disabled" : ""
          }`}
          type="button"
          onClick={applyCode}
        >
          {isLoading ? <ThreeDotLoader /> : "APPLY"}
        </button>
      </div>
    </div>
  );
};

export default PromoField;
