const PUBLIC_CHECKOUT_HOST = "signup.thecodingspace.com";

const legacySignupUrl = (classTypeId, enrollmentType) => {
  const trialQuery =
    enrollmentType === "trial_class" ? "?trial_class=true" : "";

  return `/sign_up/classes/${classTypeId}${trialQuery}`;
};

const validPublicCheckoutUrl = (url, classTypeId) => {
  if (typeof url !== "string" || !url.length) return false;

  try {
    const parsedUrl = new URL(url);

    return (
      parsedUrl.protocol === "https:" &&
      parsedUrl.hostname === PUBLIC_CHECKOUT_HOST &&
      parsedUrl.pathname === `/checkout/${classTypeId}`
    );
  } catch (_error) {
    return false;
  }
};

const signupLinkFor = ({ classTypeId, enrollmentType, publicCheckoutUrls }) => {
  const candidatePublicCheckoutUrl =
    publicCheckoutUrls && publicCheckoutUrls[enrollmentType];
  const publicCheckoutUrl = validPublicCheckoutUrl(
    candidatePublicCheckoutUrl,
    classTypeId
  )
    ? candidatePublicCheckoutUrl
    : null;

  return {
    isPublicCheckout: !!publicCheckoutUrl,
    url: publicCheckoutUrl || legacySignupUrl(classTypeId, enrollmentType),
  };
};

module.exports = { signupLinkFor };
