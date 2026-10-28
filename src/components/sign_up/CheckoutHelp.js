import React from "react";

export default function CheckoutHelp({ paymentId }) {
  return (
    <p>
      Contact{" "}
      <a href="mailto:admissions@thecodingspace.com">
        admissions@thecodingspace.com
      </a>{" "}
      for help with this registration.
      {paymentId && <> Payment reference: {paymentId}.</>}
    </p>
  );
}
