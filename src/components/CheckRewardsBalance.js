import React, { useState } from "react";
import * as Yup from "yup";
import { Formik, Field } from "formik";
import FormikError from "./sign_up/FormikError";
import { buildQueryString, GET } from "../utils/service";
import ThreeDotLoader from "./shared/three-dot-loader";

const api = {
  checkBalance: params =>
    GET(
      `${
        process.env.DASHBOARD_BASE_URL
      }/services/rewards/check_balance?${buildQueryString(params)}`
    ),
};

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Required"),
});

const CheckRewardsBalance = () => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  if (!!successMsg) {
    return <div style={{ margin: "2rem" }}>{successMsg}</div>;
  }

  return (
    <div className="check-rewards-balance">
      <Formik
        initialValues={{
          email: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, actions) => {
          try {
            setErrorMsg(); // if another attempt
            const { success } = await api.checkBalance(values);
            setSuccessMsg(success);
          } catch (error) {
            const { status, errors } = error;
            if (status === 422) {
              actions.setErrors(errors);
            } else {
              setErrorMsg(error.message || "Something went wrong");
            }
            actions.setSubmitting(false);
          }
        }}
      >
        {({ handleSubmit, isSubmitting }) => {
          return (
            <>
              <p>
                Complete the form below and we'll securely deliver your rewards
                balance and redemption code to your inbox.
              </p>
              <form
                className="form"
                onSubmit={handleSubmit}
                style={{ display: "flex" }}
              >
                <div
                  className="input-container"
                  style={{
                    marginRight: "1rem",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Field
                    name="email"
                    component="input"
                    type="email"
                    placeholder="your@email.com"
                  />
                  <FormikError name="email" />
                </div>
                <button
                  disabled={isSubmitting}
                  className={`small-button ${
                    isSubmitting ? "small-button--disabled" : ""
                  }`}
                  style={{ maxHeight: 34 }}
                  type="submit"
                >
                  {isSubmitting ? <ThreeDotLoader /> : "Check Balance"}
                </button>
              </form>
            </>
          );
        }}
      </Formik>
      {!!errorMsg && <p style={{ color: "red", margin: "2rem" }}>{errorMsg}</p>}
    </div>
  );
};

export default CheckRewardsBalance;
