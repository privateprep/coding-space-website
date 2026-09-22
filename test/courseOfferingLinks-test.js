const assert = require("assert");

const { signupLinkFor } = require("../src/utils/courseOfferingLinks");

const publicCheckoutUrls = {
  all: "https://signup.thecodingspace.com/checkout/4759?class_signup%5Benrollment_type%5D=all",
  trial_class:
    "https://signup.thecodingspace.com/checkout/4759?class_signup%5Benrollment_type%5D=trial_class",
};

assert.deepStrictEqual(
  signupLinkFor({
    classTypeId: 4759,
    enrollmentType: "all",
    publicCheckoutUrls,
  }),
  {
    isPublicCheckout: true,
    url: publicCheckoutUrls.all,
  }
);

assert.deepStrictEqual(
  signupLinkFor({
    classTypeId: 4759,
    enrollmentType: "trial_class",
    publicCheckoutUrls,
  }),
  {
    isPublicCheckout: true,
    url: publicCheckoutUrls.trial_class,
  }
);

assert.deepStrictEqual(
  signupLinkFor({ classTypeId: 4759, enrollmentType: "all" }),
  {
    isPublicCheckout: false,
    url: "/sign_up/classes/4759",
  }
);

assert.deepStrictEqual(
  signupLinkFor({
    classTypeId: 4759,
    enrollmentType: "trial_class",
    publicCheckoutUrls: { all: publicCheckoutUrls.all },
  }),
  {
    isPublicCheckout: false,
    url: "/sign_up/classes/4759?trial_class=true",
  }
);

[
  "",
  "not-a-url",
  "http://signup.thecodingspace.com/checkout/4759",
  "https://example.com/checkout/4759",
  "https://signup.thecodingspace.com/checkout/9999",
].forEach(publicCheckoutUrl => {
  assert.deepStrictEqual(
    signupLinkFor({
      classTypeId: 4759,
      enrollmentType: "all",
      publicCheckoutUrls: { all: publicCheckoutUrl },
    }),
    {
      isPublicCheckout: false,
      url: "/sign_up/classes/4759",
    }
  );
});

console.log("Course offering signup links passed");
