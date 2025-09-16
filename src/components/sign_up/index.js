import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import { DateTime } from "luxon";

import Wizard from "./Wizard";
import FormPage from "./FormPage";
import OverviewPage from "./OverviewPage";
import ConfirmationPage from "./ConfirmationPage";
import CheckoutPage from "./CheckoutPage";
import { getClassOverview, signupForClass } from "./api";
import BoxWithLogo from "../BuilderComponents/BoxWithLogo";

import {
  overviewFields,
  trialField,
  studentFields,
  parentFields,
  billingFields,
  termFields,
} from "./formFields";

import "./styles/sign-up.scss";

const filterFields = (fields, filterValues) => {
  let filteredFields = fields;
  for (const filterValue of filterValues) {
    filteredFields = filteredFields.filter(field => field.name !== filterValue);
  }

  return filteredFields;
};

const initialValues = isTrialClass => {
  let values = {};

  const sharedFields = [
    overviewFields,
    studentFields,
    parentFields,
    billingFields,
    termFields,
  ].flat();

  const allFields = isTrialClass ? [trialField, ...sharedFields] : sharedFields;

  allFields.forEach(field => {
    values[field.name] = field.initialValue;
  });

  return values;
};

const confirmationPageSubmitText = values => {
  if (values.price_shown_to_customer === "0.00") return "Confirm Signup";

  return "Proceed to Checkout";
};

const SignUp = ({ classTypeId, location: { search } }) => {
  const [adsTracking, setAdsTracking] = useState({});
  const [paymentIntent, setPaymentIntent] = useState(null);
  const [stripePublicKey, setStripePublicKey] = useState(null);
  const [overview, setOverview] = useState();
  const [submitError, setSubmitError] = useState();
  const [fetchError, setFetchError] = useState();
  const [isOnline, setIsOnline] = useState(false);
  const isTrialClass = search.includes("trial_class=true");
  const pageTitle = isTrialClass ? "Try A Class" : "Sign Up";
  const enrollmentType = isTrialClass ? "trial_class" : "all";

  useEffect(() => {
    if (!overview) {
      getClassOverview(classTypeId, isTrialClass)
        .then(deets => {
          if (!(deets?.enrollmentTypes || []).includes(enrollmentType)) {
            return Promise.reject(
              new Error("Registration for this signup has closed.")
            );
          }

          let userTimeZone;
          try {
            userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          } catch (e) {
            userTimeZone = "America/New_York";
          }

          const firstDate = DateTime.fromISO(deets.startsAt, {
            zone: userTimeZone,
          }).toFormat("MMM d");
          const lastDate = DateTime.fromISO(deets.lastSessionAt, {
            zone: userTimeZone,
          }).toFormat("MMM d");

          const dateRange = `${firstDate} - ${lastDate}`;
          const classStarts = DateTime.fromISO(deets.startsAt, {
            zone: userTimeZone,
          }).toFormat("h:mm");
          const classEnds = DateTime.fromISO(deets.endsAt, {
            zone: userTimeZone,
          }).toFormat("t");

          const sessions = deets.sessions.map(session => ({
            ...session,
            optionLabel: DateTime.fromISO(session.scheduledAt, {
              zone: userTimeZone,
            }).toFormat("FF"),
          }));

          const scheduledTimeRange = `${classStarts} to ${classEnds}`;

          setIsOnline(!!deets.locationName.match(/online/i));

          setOverview({
            ...deets,
            dateRange,
            scheduledTimeRange,
            classStarts,
            classEnds,
            sessions,
          });
        })
        .catch(setFetchError);
    }
  }, [overview, classTypeId, isTrialClass, enrollmentType]);

  const onSuccessRedirect = () => {
    navigate(`/thank_you`, {
      replace: true,
      state: { adsTracking: adsTracking },
    });
  };

  const handleCheckoutSuccess = (adsTrackingData) => {
    setAdsTracking(adsTrackingData);
    onSuccessRedirect();
  };

  const handleConfirmationSubmit = async (values, bag) => {
    setSubmitError(undefined);

    try {
      const res = await signupForClass(values);
      setAdsTracking(res.adsTracking);

      if (res.nextStep === "collect_payment") {
        // Only get the Stripe public key, don't create payment intent yet
        setStripePublicKey(res.stripePublicKey);
      } else if (res.nextStep === "send_confirmation") {
        onSuccessRedirect();
      } else {
        throw new Error("Next step unknown!");
      }
      bag.setSubmitting(false);
    } catch (error) {
      if (error.status === 422) {
        bag.setErrors(error.errors);
        setSubmitError(error);
        bag.setSubmitting(false);
        return Promise.reject("handledFormError");
      } else {
        throw error;
      }
    }
  };

  useEffect(() => {
    const getStripeKey = async () => {
      try {
        const response = await fetch(`${process.env.DASHBOARD_BASE_URL}/services/stripe/public_key`);
        const data = await response.json();
        setStripePublicKey(data.public_key);
      } catch (error) {
        console.error('Failed to get Stripe public key:', error);
      }
    };

    if (!stripePublicKey) {
      getStripeKey();
    }
  }, [stripePublicKey]);

  if (!!fetchError) {
    return (
      <div className="SignUp">
        <BoxWithLogo
          heading="We ran into a problem..."
          mdContent={fetchError.message}
        ></BoxWithLogo>
      </div>
    );
  }

  if (!overview) {
    return (
      <div className="SignUp">
        <h1 className="title">Loading Class Details...</h1>
      </div>
    );
  }

  return (
    <Wizard
      initialValues={initialValues(isTrialClass)}
      title={pageTitle}
      stepMenu={[
        "Overview",
        "Student Profile",
        "Parent Details",
        "Billing Details",
        "Terms & Misc",
        "Confirm",
        "Checkout",
      ]}
      submitError={submitError}
    >
      <OverviewPage
        title={"Overview"}
        classTypeId={classTypeId}
        isTrialClass={isTrialClass}
        overview={overview}
        enrollmentType={enrollmentType}
        fields={isTrialClass ? [trialField, ...overviewFields] : overviewFields}
        onSubmit={"nextPage"}
        hideWizardActions={
          !(overview?.enrollmentTypes || []).includes(enrollmentType)
        }
        submitText={"Begin »"}
      />
      <FormPage
        title="Student Profile"
        fields={
          isOnline
            ? studentFields
            : filterFields(studentFields, ["device_type"])
        }
        onSubmit={"nextPage"}
        submitText={"Next »"}
      />
      <FormPage
        title="Parent Details"
        subtitle="Please use the same name as will appear on the card during checkout."
        fields={parentFields}
        onSubmit={"nextPage"}
        submitText={"Next »"}
      />
      <FormPage
        title="Billing Details"
        subtitle="These fields should match the address on the card that will be used."
        fields={billingFields}
        onSubmit={"nextPage"}
        submitText={"Next »"}
      />
      <FormPage
        title={"Terms & Misc"}
        fields={termFields}
        onSubmit={"nextPage"}
        submitText={"Next »"}
      />
      <ConfirmationPage
        title="Confirm"
        subtitle="Please take a second to double check the following. Payments using a credit card will incur a 3% processing fee. To avoid this fee you can use a debit card, which will remain as a no-fee option."
        submitError={submitError}
        overview={overview}
        isTrialClass={isTrialClass}
        onSubmit={handleConfirmationSubmit}
        setSubmitTextFromValues={confirmationPageSubmitText}
      />
      <CheckoutPage
        title="Checkout"
        stripePublicKey={stripePublicKey}
        onSuccessRedirect={handleCheckoutSuccess}
        hideWizardActions
      />
    </Wizard>
  );
};

export default SignUp;
