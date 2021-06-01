import React from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import ErrorEmailRedirection from "../ErrorEmailRedirection";
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
    bag.resetForm({ initialTouched: [] });
    // enable form submission
    this.setState({ manualSubmitting: false });
  };

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0),
    }));

  handleSubmit = (values, bag) => {
    this.setState({ manualSubmitting: true }); // disables form

    const childrenAsArray = React.Children.toArray(this.props.children);
    const activePage = childrenAsArray[this.state.page];
    const isLastPage =
      this.state.page === React.Children.count(this.props.children) - 1;

    if (activePage.props.onSubmit === "nextPage") {
      return this.next(values, bag);
    }

    activePage.props
      .onSubmit(values, bag)
      .then(() => {
        if (!isLastPage && !this.props.submitError) {
          return this.next(values, bag);
        }
      })
      .catch(error => {
        // Promise rejected meaning a handled submitError occured
        if (error === "handledFormError") {
          console.error("Form failed with following error", error);
        } else {
          throw error;
        }
      })
      .finally(() => {
        this.setState({ manualSubmitting: false });
      });
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
    const { children, stepMenu, title, submitError } = this.props;
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
                    <p className="error">
                      {submitError.message ||
                        submitError.statusText ||
                        "Unknown error"}
                    </p>
                    <ErrorEmailRedirection />
                    <details>
                      <summary>Error Details</summary>
                      <pre style={{ maxWidth: `100%` }}>
                        {JSON.stringify(submitError, null, 2)}
                      </pre>
                    </details>
                  </>
                )}
                {!activePage.props.hideWizardActions && (
                  <div className="SignUp__container__form__actions">
                    {page > 0 && (
                      <button
                        type="button"
                        onClick={this.previous}
                        disabled={props.isSubmitting}
                      >
                        « Previous
                      </button>
                    )}
                    <button
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
