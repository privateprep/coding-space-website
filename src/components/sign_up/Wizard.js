import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import CheckoutHelp from "./CheckoutHelp";
import ThreeDotLoader from "../shared/three-dot-loader";
import StepMenu from "./StepMenu";

// Developed upon https://codesandbox.io/s/62nk7x0p73
class Wizard extends React.Component {
  static Page = ({ children, parentState }) => {
    return children(parentState);
  };

  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues,
      manualSubmitting: false, // formik's isSubmitting not totally accurate
    };
  }

  next = (values, bag) => {
    let nextValues;
    if (!!values) {
      nextValues = { ...this.state.values, ...values };
    } else {
      nextValues = { ...this.state.values };
    }

    // sets values into state which become Formik's initialValues
    this.setState(state => ({
      page: Math.min(state.page + 1, this.props.children.length - 1),
      values: nextValues,
    }));

    // hides errors of newly shown fields
    bag.resetForm({ values: nextValues, touched: {} });
    // enable form submission
    this.setState({ manualSubmitting: false });
  };

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSubmit = async (values, bag) => {
    const childrenAsArray = React.Children.toArray(this.props.children);
    const activePage = childrenAsArray[this.state.page];
    // The payment page handles its own button; Enter must not invoke a missing handler.
    if (!activePage.props.onSubmit || this.submitting) {
      bag.setSubmitting(false);
      return;
    }
    this.submitting = true;
    this.setState({ manualSubmitting: true, unexpectedError: null });
    const isLastPage =
      this.state.page === React.Children.count(this.props.children) - 1;
    try {
      if (activePage.props.onSubmit === "nextPage")
        return this.next(values, bag);
      await activePage.props.onSubmit(values, bag);
      // Success/failure comes from the promise, not potentially stale parent error props.
      if (!isLastPage) this.next(values, bag);
    } catch (error) {
      if (error !== "handledFormError")
        this.setState({
          unexpectedError: {
            message:
              "We could not continue checkout. Your registration may already exist. Please contact admissions before starting another signup.",
          },
        });
    } finally {
      this.submitting = false;
      bag.setSubmitting(false);
      this.setState({ manualSubmitting: false });
    }
  };

  createValidationSchema = fields => {
    if (!fields || !fields.length) return;

    const schema = {};
    fields.forEach(field => {
      schema[field.name] = field.validator;
    });
    return Yup.object().shape(schema);
  };

  render() {
    const { children, stepMenu, title } = this.props;
    const submitError = this.state.unexpectedError || this.props.submitError;
    const { page, values, manualSubmitting } = this.state;
    const childrenAsArray = React.Children.toArray(children);
    const activePage = childrenAsArray[page];
    const submitText =
      typeof activePage.props.setSubmitTextFromValues === "function"
        ? activePage.props.setSubmitTextFromValues(values)
        : activePage.props.submitText;

    return (
      <Formik
        initialValues={values}
        enableReinitialize={true} // allow form to reset via this.next
        validationSchema={this.createValidationSchema(activePage.props.fields)}
        onSubmit={this.handleSubmit}
      >
        {props => (
          <div className="SignUp">
            <h1 className="title">{title}</h1>
            <div className="SignUp__container">
              <StepMenu items={stepMenu} activeStep={activePage.props.title} />
              <form
                className="SignUp__container__form"
                onSubmit={props.handleSubmit}
              >
                {React.cloneElement(activePage, {
                  parentState: { ...props },
                })}
                {!!submitError && (
                  <>
                    <p className="error" role="alert">
                      {submitError.message ||
                        submitError.statusText ||
                        "Unknown error"}
                    </p>
                    <CheckoutHelp paymentId={submitError.paymentId} />
                  </>
                )}
                {!activePage.props.hideWizardActions && (
                  <div className="SignUp__container__form__actions">
                    {page > 0 && (
                      <button
                        className="button"
                        type="button"
                        onClick={this.previous}
                        disabled={
                          props.isSubmitting ||
                          manualSubmitting ||
                          this.props.lockDetails
                        }
                      >
                        « Previous
                      </button>
                    )}
                    <button
                      className="button"
                      type="submit"
                      disabled={props.isSubmitting || manualSubmitting}
                    >
                      {submitText}
                      {(props.isSubmitting || manualSubmitting) && (
                        <ThreeDotLoader />
                      )}
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
      </Formik>
    );
  }
}

export default Wizard;
