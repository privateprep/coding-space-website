import React from "react";

const ErrorEmailRedirection = () => (
  <p>
    If this problem persists, please reach out to us at{" "}
    <a href={`mailto:${process.env.ERROR_EMAIL}`}>{process.env.ERROR_EMAIL}</a>.
    Please be sure to include the following details so our team is best equipped
    to meet your needs!
  </p>
);

export default ErrorEmailRedirection;
