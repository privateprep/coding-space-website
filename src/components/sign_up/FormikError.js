import React from "react";
import { ErrorMessage } from "formik";

const FormikError = props => (
  <ErrorMessage {...props}>
    {msg => (
      <div
        style={{
          color: "red",
          marginLeft: "0.25rem",
          display: "inline-block",
        }}
      >
        {Array.isArray(msg) ? msg.join("; ") : msg}
      </div>
    )}
  </ErrorMessage>
);

export default FormikError;
