// A slow request may still finish. Warn without aborting or enabling another charge.
export async function waitForCheckout(operation, onSlow) {
  const timer = setTimeout(onSlow, 20000);
  try {
    return await operation();
  } finally {
    clearTimeout(timer);
  }
}

export const UNKNOWN_PAYMENT_MESSAGE =
  "We could not confirm your payment status. Do not submit another payment or start another signup. Contact admissions so we can check your payment and help you finish.";

export const EXISTING_SIGNUP_MESSAGE =
  "A registration already exists for one or more selected sessions. If you have not finished paying, contact admissions for help checking its status and resuming payment. Do not start another signup.";
