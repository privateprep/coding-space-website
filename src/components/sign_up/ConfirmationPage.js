import React from "react";
import Wizard from "./Wizard";

const ConfirmationPage = ({
  overview,
  title,
  subtitle,
  parentState: { values },
}) => (
  <Wizard.Page>
    {() => (
      <div className="confirmation-page">
        <h2 className="title">{title}</h2>
        {!!subtitle && <p className="subtitle">{subtitle}</p>}

        <ul className="confirmation-page__details">
          <li>
            <strong>Student Name </strong>
            {`${values.student_first} ${values.student_last}`}
          </li>
          <li>
            <strong>Parent Name </strong>
            {`${values.parent_first} ${values.parent_last}`}
            <p className="hint">
              Should match the card that will be used in the next step.
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
              Should match the card that will be used in the next step.
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
            {values.price_shown_to_customer !== "0.00" && (
              <span> (3% credit card fee may apply)</span>
            )}
          </li>
          <li>
            <strong>Refund Policy </strong> View our policy{" "}
            <a href="/refund_policy" target="_blank" rel="noopener noreferrer">
              here
            </a>
            . <p className="hint">Link will open in new tab.</p>
          </li>
        </ul>
      </div>
    )}
  </Wizard.Page>
);

export default ConfirmationPage;
