const assert = require("assert");
const path = require("path");
const vm = require("vm");
const babel = require("@babel/core");
const React = require("react");

// Exercise the real component event handlers without a browser or live Stripe.
function loadModule(file, imports, globals = {}) {
  const filename = path.join(__dirname, "..", file);
  const { code } = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [require.resolve("@babel/preset-react")],
    plugins: [require.resolve("@babel/plugin-transform-modules-commonjs")],
  });
  const exports = {};
  vm.runInNewContext(
    code,
    {
      exports,
      require: name => {
        assert(name in imports, `Unexpected import: ${name}`);
        return imports[name];
      },
      process: {
        env: { DASHBOARD_BASE_URL: "https://dashboard.example.test" },
      },
      fetch: async () => ({ json: async () => ({ public_key: "pk_test" }) }),
      console: { error: () => {} },
      setTimeout,
      clearTimeout,
      ...globals,
    },
    { filename }
  );
  return exports;
}

function hooks() {
  const values = [];
  let cursor = 0;
  let effects = [];
  const react = {
    ...React,
    useState(initial) {
      const index = cursor++;
      if (!(index in values)) values[index] = initial;
      return [
        values[index],
        value => {
          values[index] = value;
        },
      ];
    },
    useRef(initial) {
      return react.useState({ current: initial })[0];
    },
    useEffect(effect) {
      effects.push(effect);
    },
  };
  return {
    react,
    render(component, props) {
      cursor = 0;
      effects = [];
      return component(props);
    },
    runEffects() {
      effects.forEach(effect => effect());
    },
  };
}

function find(element, predicate) {
  if (!React.isValidElement(element)) return undefined;
  if (predicate(element)) return element;
  for (const child of React.Children.toArray(element.props.children)) {
    const match = find(child, predicate);
    if (match) return match;
  }
}

function fixture() {
  const timers = new Set();
  const timerGlobals = {
    setTimeout: callback => {
      timers.add(callback);
      return callback;
    },
    clearTimeout: callback => timers.delete(callback),
  };
  const progress = loadModule(
    "src/components/sign_up/checkoutProgress.js",
    {},
    timerGlobals
  );
  const requests = [];
  const responses = [];
  const redirects = [];
  const tracking = { transaction_id: 91, coupon: "TEST", value: "100.00" };
  const api = loadModule("src/components/sign_up/api.js", {
    "../../utils/service": {
      POST: async (url, body) => {
        requests.push({ url, body });
        assert(responses.length, "Unexpected API request");
        const result = responses.shift();
        if (result instanceof Error) throw result;
        return result;
      },
    },
  });
  const signupHooks = hooks();
  const signup = loadModule("src/components/sign_up/index.js", {
    react: signupHooks.react,
    gatsby: { navigate: (url, options) => redirects.push({ url, options }) },
    luxon: require("luxon"),
    "./Wizard": "Wizard",
    "./FormPage": "FormPage",
    "./OverviewPage": "OverviewPage",
    "./ConfirmationPage": "ConfirmationPage",
    "./CheckoutPage": "CheckoutPage",
    "../BuilderComponents/BoxWithLogo": "BoxWithLogo",
    "./styles/sign-up.scss": {},
    "./checkoutProgress": progress,
    "./formFields": Object.fromEntries(
      [
        "overviewFields",
        "trialField",
        "studentFields",
        "parentFields",
        "billingFields",
        "termFields",
      ].map(name => [name, []])
    ),
    "./api": {
      ...api,
      getClassOverview: async () => ({
        enrollmentTypes: ["all"],
        locationName: "NYC",
        sessions: [],
        startsAt: "2026-11-01T10:00:00Z",
        lastSessionAt: "2026-11-08T10:00:00Z",
        endsAt: "2026-11-01T12:00:00Z",
      }),
    },
  }).default;
  const signupProps = { classTypeId: 4759, location: { search: "" } };
  const renderSignup = () => signupHooks.render(signup, signupProps);
  const formValues = {
    parent_first: "Test",
    parent_last: "Parent",
    parent_email: "test@example.test",
    price_shown_to_customer: "100.00",
  };
  const stripeCalls = [];
  const stripe = {
    createPaymentMethod: async () => {
      stripeCalls.push("createPaymentMethod");
      return {
        paymentMethod: { id: "pm_credit", card: { funding: "credit" } },
      };
    },
    confirmCardPayment: async secret => {
      stripeCalls.push(["confirm", secret]);
      return {};
    },
    retrievePaymentIntent: async secret => {
      stripeCalls.push(["retrieve", secret]);
      return { paymentIntent: { status: "succeeded" } };
    },
  };
  const paymentHooks = hooks();
  let stripeLoader = async () => stripe;
  const { CheckoutForm, default: CheckoutPage } = loadModule(
    "src/components/sign_up/CheckoutPage.js",
    {
      react: paymentHooks.react,
      "@stripe/react-stripe-js": {
        CardElement: "CardElement",
        Elements: "Elements",
        useStripe: () => stripe,
        useElements: () => ({ getElement: () => "card" }),
      },
      "@stripe/stripe-js": { loadStripe: () => stripeLoader() },
      "./CheckoutHelp": "CheckoutHelp",
      "./checkoutProgress": progress,
      "../shared/three-dot-loader": "ThreeDotLoader",
      "./api": api,
    },
    timerGlobals
  );
  const renderPayment = () => {
    const checkout = find(
      renderSignup(),
      element => element.type === "CheckoutPage"
    );
    return paymentHooks.render(CheckoutForm, {
      ...checkout.props,
      parentState: { values: formValues },
    });
  };
  const purchase = () =>
    find(renderPayment(), element => element.type === "button").props.onClick({
      preventDefault() {},
    });
  const error = () =>
    find(renderPayment(), element => element.type.name === "CardError")?.props
      .cardError;
  const submitDetails = () =>
    find(
      renderSignup(),
      element => element.type === "ConfirmationPage"
    ).props.onSubmit(formValues, { setSubmitting() {}, setErrors() {} });
  return {
    api,
    requests,
    responses,
    redirects,
    tracking,
    stripe,
    stripeCalls,
    purchase,
    error,
    renderPayment,
    submitDetails,
    renderSignup,
    fireTimers() {
      [...timers].forEach(callback => {
        timers.delete(callback);
        callback();
      });
    },
    timerCount: () => timers.size,
    setStripeLoader(loader) {
      stripeLoader = loader;
    },
    checkoutPage() {
      const page = new CheckoutPage();
      page.props = { stripePublicKey: "pk_test", paymentId: 42 };
      page.setState = update => {
        page.state = { ...page.state, ...update };
      };
      return page;
    },
    async initialize() {
      renderSignup();
      signupHooks.runEffects();
      await new Promise(resolve => setImmediate(resolve));
    },
    async reserve(
      result = {
        nextStep: "collect_payment",
        paymentId: 42,
        stripePublicKey: "pk_test",
        adsTracking: tracking,
      }
    ) {
      responses.push(result);
      await submitDetails();
    },
  };
}

async function run() {
  const f = fixture();
  await f.initialize();
  await f.reserve();
  assert.equal(f.requests.length, 1);
  assert(f.requests[0].url.endsWith("/services/class_signups/coding_space"));
  assert.equal(
    find(f.renderPayment(), el => el.type === "button").props.type,
    "button"
  );
  f.responses.push({
    nextStep: "send_confirmation",
    adsTracking: { coupon: "" },
  });
  await f.purchase();
  assert(
    f.requests[1].url.endsWith(
      "/services/class_signups/42/complete_abandoned_cart"
    )
  );
  assert.equal(
    JSON.stringify(f.requests[1].body),
    JSON.stringify({
      apply_credit_card_fee: true,
      payment_method_id: "pm_credit",
    })
  );
  assert.equal(f.redirects[0].url, "/thank_you");
  assert.strictEqual(f.redirects[0].options.state.adsTracking, f.tracking);

  const retry = fixture();
  await retry.initialize();
  await retry.reserve();
  retry.responses.push(
    Object.assign(new Error("Your card was declined."), {
      status: 422,
      body: { code: "card_declined" },
    })
  );
  await retry.purchase();
  assert.equal(retry.error().message, "Your card was declined.");
  assert.equal(retry.redirects.length, 0);
  retry.stripe.createPaymentMethod = async () => ({
    paymentMethod: { id: "pm_debit", card: { funding: "debit" } },
  });
  retry.responses.push({
    nextStep: "requires_action",
    paymentIntent: { client_secret: "test_secret" },
  });
  await retry.purchase();
  assert.equal(retry.requests.length, 3);
  assert.equal(retry.requests[1].url, retry.requests[2].url);
  assert.equal(retry.requests[2].body.apply_credit_card_fee, false);
  assert.deepEqual(retry.stripeCalls.slice(-2), [
    ["confirm", "test_secret"],
    ["retrieve", "test_secret"],
  ]);
  assert.equal(retry.redirects.length, 1);

  const failed3ds = fixture();
  await failed3ds.initialize();
  await failed3ds.reserve();
  failed3ds.responses.push({
    nextStep: "requires_action",
    paymentIntent: { client_secret: "test_secret" },
  });
  failed3ds.stripe.confirmCardPayment = async () => ({
    error: { message: "Authentication failed" },
  });
  await failed3ds.purchase();
  assert.equal(failed3ds.error().message, "Authentication failed");
  assert.equal(failed3ds.redirects.length, 0);

  const unavailable = fixture();
  await unavailable.initialize();
  await unavailable.reserve();
  unavailable.responses.push(
    Object.assign(
      new Error("This registration is no longer available for payment."),
      { status: 409 }
    )
  );
  await unavailable.purchase();
  assert.equal(
    unavailable.error().message,
    "This registration is no longer available for payment."
  );
  assert.equal(unavailable.redirects.length, 0);

  const free = fixture();
  await free.initialize();
  await free.reserve({
    nextStep: "send_confirmation",
    adsTracking: free.tracking,
  });
  assert.equal(free.requests.length, 1);
  assert.strictEqual(
    free.redirects[0].options.state.adsTracking,
    free.tracking
  );
  assert.equal(free.stripeCalls.length, 0);

  const missing = fixture();
  await missing.initialize();
  await missing.purchase();
  assert.match(missing.error().message, /payment is missing/);
  assert.equal(missing.stripeCalls.length, 0);
  assert.equal(missing.requests.length, 0);
  for (const id of [null, undefined, 0, -1, "42", "42/other"]) {
    assert.throws(
      () => missing.api.completeClassSignupPayment(id, {}),
      /payment is missing/
    );
  }
  await assert.rejects(
    missing.reserve({ nextStep: "collect_payment" }),
    error => error === "handledFormError"
  );

  const doubleClick = fixture();
  await doubleClick.initialize();
  await doubleClick.reserve();
  doubleClick.responses.push({ nextStep: "send_confirmation" });
  const button = find(doubleClick.renderPayment(), el => el.type === "button");
  await Promise.all([
    button.props.onClick({ preventDefault() {} }),
    button.props.onClick({ preventDefault() {} }),
  ]);
  assert.equal(doubleClick.requests.length, 2);
  assert.equal(doubleClick.redirects.length, 1);
  await doubleClick.purchase();
  assert.equal(doubleClick.requests.length, 2);

  // A stalled Stripe call warns without creating a payment or accepting another click.
  const slowCard = fixture();
  await slowCard.initialize();
  await slowCard.reserve();
  let releaseCard;
  slowCard.stripe.createPaymentMethod = () =>
    new Promise(resolve => {
      releaseCard = resolve;
    });
  const cardAttempt = slowCard.purchase();
  slowCard.fireTimers();
  assert.match(
    find(slowCard.renderPayment(), el => el.props.role === "status").props
      .children,
    /Card verification is taking longer/
  );
  await slowCard.purchase();
  assert.equal(slowCard.requests.length, 1);
  releaseCard({ error: { message: "Card details are incomplete" } });
  await cardAttempt;
  assert.equal(slowCard.timerCount(), 0);

  // Slow charge responses remain locked, but late success is still handled once.
  const slowCharge = fixture();
  await slowCharge.initialize();
  await slowCharge.reserve();
  let releaseCharge;
  slowCharge.responses.push(
    new Promise(resolve => {
      releaseCharge = resolve;
    })
  );
  const chargeAttempt = slowCharge.purchase();
  await new Promise(resolve => setImmediate(resolve));
  slowCharge.fireTimers();
  assert.match(
    find(slowCharge.renderPayment(), el => el.props.role === "status").props
      .children,
    /Payment is taking longer/
  );
  await slowCharge.purchase();
  assert.equal(slowCharge.requests.length, 2);
  releaseCharge({ nextStep: "send_confirmation" });
  await chargeAttempt;
  assert.equal(slowCharge.redirects.length, 1);
  assert.equal(slowCharge.timerCount(), 0);

  for (const failure of [
    new Error("Network failed"),
    Object.assign(new Error("Stripe unavailable"), {
      status: 422,
      body: { code: "payment_status_unknown" },
    }),
  ]) {
    const uncertain = fixture();
    await uncertain.initialize();
    await uncertain.reserve();
    uncertain.responses.push(failure);
    await uncertain.purchase();
    assert.match(
      find(uncertain.renderPayment(), el => el.props.role === "status").props
        .children,
      /Do not submit another payment/
    );
    assert.equal(
      find(uncertain.renderPayment(), el => el.type === "button").props
        .disabled,
      true
    );
    await uncertain.purchase();
    assert.equal(uncertain.requests.length, 2);
    assert.equal(uncertain.redirects.length, 0);
  }

  const slowSignup = fixture();
  await slowSignup.initialize();
  let releaseSignup;
  const reservation = slowSignup.reserve(
    new Promise(resolve => {
      releaseSignup = resolve;
    })
  );
  slowSignup.fireTimers();
  assert.match(
    slowSignup.renderSignup().props.submitError.message,
    /Registration is taking longer/
  );
  releaseSignup({
    nextStep: "collect_payment",
    paymentId: 42,
    stripePublicKey: "pk_test",
  });
  await reservation;
  await slowSignup.submitDetails();
  assert.equal(slowSignup.requests.length, 1);
  assert.equal(slowSignup.renderSignup().props.submitError, undefined);

  const unknownSignup = fixture();
  await unknownSignup.initialize();
  await assert.rejects(unknownSignup.reserve(new Error("Network failed")));
  await assert.rejects(unknownSignup.submitDetails());
  assert.equal(unknownSignup.requests.length, 1);
  assert.match(
    unknownSignup.renderSignup().props.submitError.message,
    /registration may already exist/
  );

  const duplicate = fixture();
  await duplicate.initialize();
  await assert.rejects(
    duplicate.reserve(
      Object.assign(new Error("Already signed up"), {
        status: 422,
        body: { code: "signup_already_exists" },
      })
    )
  );
  assert.match(
    duplicate.renderSignup().props.submitError.message,
    /resuming payment/
  );

  const loader = fixture();
  const page = loader.checkoutPage();
  let releaseLoader;
  loader.setStripeLoader(
    () =>
      new Promise(resolve => {
        releaseLoader = resolve;
      })
  );
  const loading = page.initializeStripe();
  await new Promise(resolve => setImmediate(resolve));
  loader.fireTimers();
  assert.match(page.state.loadError, /payment form could not load/);
  releaseLoader(loader.stripe);
  await loading;
  assert.equal(page.state.loadError, null);
  assert.strictEqual(page.state.stripePromise, loader.stripe);
  for (const load of [
    async () => null,
    async () => {
      throw new Error("Blocked script");
    },
  ]) {
    loader.setStripeLoader(load);
    await page.initializeStripe();
    assert.match(page.state.loadError, /No payment has been submitted/);
  }
  page.props.stripePublicKey = null;
  await page.initializeStripe();
  assert.match(page.state.loadError, /payment form could not load/);

  const Wizard = loadModule("src/components/sign_up/Wizard.js", {
    react: React,
    yup: {},
    formik: { Formik: "Formik" },
    "./CheckoutHelp": "CheckoutHelp",
    "../shared/three-dot-loader": "ThreeDotLoader",
    "./StepMenu": "StepMenu",
  }).default;
  const wizard = new Wizard({ initialValues: { photo_release: true } });
  wizard.props = {
    submitError: { message: "Stale error from an earlier attempt" },
    children: [
      React.createElement("page", { onSubmit: async () => {} }),
      React.createElement("page", {}),
    ],
  };
  wizard.setState = update => {
    wizard.state = {
      ...wizard.state,
      ...(typeof update === "function" ? update(wizard.state) : update),
    };
  };
  let resetValues;
  const bag = {
    resetForm: values => {
      resetValues = values;
    },
    setSubmitting() {},
  };
  await wizard.handleSubmit({ parent_first: "Test" }, bag);
  assert.equal(wizard.state.page, 1);
  assert.equal(resetValues.values.photo_release, true);
  assert.equal(resetValues.values.parent_first, "Test");
  await wizard.handleSubmit({}, bag); // Enter on payment page has no wizard handler.
  assert.equal(wizard.state.manualSubmitting, false);
  wizard.state.page = 0;
  wizard.props.children[0] = React.createElement("page", {
    onSubmit: () => {
      throw new Error("Unexpected failure");
    },
  });
  await wizard.handleSubmit({}, bag);
  assert.match(wizard.state.unexpectedError.message, /contact admissions/);
  assert.equal(wizard.state.manualSubmitting, false);

  console.log(
    "Legacy checkout tests passed: reservation handoff, fees, decline retry, 3DS, errors, tracking, missing IDs, double click."
  );
}

run().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
