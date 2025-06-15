import React from "react";
import Wizard from "./Wizard";

const ConfirmationPage = ({
  overview,
  title,
  subtitle,
  parentState,
  onSubmit,
  setIsCreditCard,
}) => {
  const { values } = parentState;
  const basePrice = parseFloat(values.price_shown_to_customer);
  const creditCardFee = basePrice * 0.03;
  const totalWithFee = basePrice + creditCardFee;

  return (
    <Wizard.Page parentState={parentState}>
      {() => (
        <div className="confirmation-page">
          <h2 className="title">{title}</h2>
          {!!subtitle && <p className="subtitle">{subtitle}</p>}

          <div className="payment-notice">
            <h3>Payment Information</h3>
            <p>A 3% fee will be added for credit card payments.</p>
            <div className="price-breakdown">
              <p>Base Price: ${basePrice.toFixed(2)}</p>
              <p>Credit Card Fee (3%): ${creditCardFee.toFixed(2)}</p>
              <p className="total">Total with Credit Card: ${totalWithFee.toFixed(2)}</p>
            </div>
          </div>

          <ul className="confirmation-page__details">
            <li>
              <strong>Student Name </strong>
              {`${values.student_first} ${values.student_last}`}
            </li>
            <li>
              <strong>Parent Name </strong>
              {`${values.parent_first} ${values.parent_last}`}
              <p className="hint">
                Should match the credit card that will be used in the next step.
              </p>
            </li>
            <li>
              <strong>Parent Email </strong>
              {values.parent_email}
              <p className="hint">
                Will be used for communication including confirmation and receipt.
              </p>
            </li>
            <li>
              <strong>Address </strong>
              {`${values.address1}${
                !!values.address2 ? ` ${values.address2}` : ""
              } ${values.city} ${values.state}, ${values.zip_code}`}
              <p className="hint">
                Should match the credit card that will be used in the next step.
              </p>
            </li>
            <li>
              <strong>Course </strong>
              {`${overview.categoryName} -- ${overview.classTypeName}`}
            </li>

            <li>
              <strong>Dates </strong>
              {`${overview.dateRange} | ${overview.sessionCount} Sessions`}
            </li>
            <li>
              <strong>Time </strong>
              {overview.scheduledTimeRange}
            </li>
            <li>
              <strong>Price </strong>
              {`$${values.price_shown_to_customer}`}
            </li>
            <li>
              <strong>Refund Policy </strong> View our policy{" "}
              <a href="/refund_policy" target="_blank" rel="noopener noreferrer">
                here
              </a>
              . <p className="hint">Link will open in new tab.</p>
            </li>
          </ul>

          <div className="payment-buttons">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => setIsCreditCard(true)}
            >
              Pay with Credit Card (${totalWithFee.toFixed(2)})
            </button>

            <button
              type="submit"
              className="btn btn-secondary"
              onClick={() => setIsCreditCard(false)}
            >
              Pay with Debit Card (${basePrice.toFixed(2)})
            </button>
          </div>
        </div>
      )}
    </Wizard.Page>
  );
};

export default ConfirmationPage;
