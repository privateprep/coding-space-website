import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import FormikError from "./FormikError";

import "./styles/FormikRadioButtonGroup.css";

export const RadioButton = ({
  field: { name, value, onChange, onBlur },
  label,
  className,
  id,
  customOnChange,
  ...props
}) => {
  const handleChange = event => {
    if (!!customOnChange) {
      customOnChange(event);
    } else {
      onChange(event);
    }
  };

  return (
    <div className={className}>
      <input
        name={name}
        id={id}
        type="radio"
        value={id}
        checked={id === value}
        onChange={handleChange}
        onBlur={onBlur}
        className="radio-button"
        {...props}
      />
      <label className="radio-button-label" htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

RadioButton.propTypes = {
  field: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  customOnChange: PropTypes.func,
};

const OtherOption = ({
  field: { name, value, onChange, onBlur },
  options,
  otherOptionLabel,
  ...props
}) => {
  const otherOptionSelcted = options.map(opt => opt.id).includes(value);

  return (
    <input
      name={name}
      type="text"
      value={otherOptionSelcted ? "" : value}
      placeholder={otherOptionLabel || "Other"}
      onChange={onChange}
      onBlur={onBlur}
      className="radio-button"
      {...props}
    />
  );
};

const FormikRadioButtonGroup = ({
  name,
  hint,
  options,
  customOnChange,
  displayRow,
  allowOther,
  otherOptionLabel,
}) => {
  return (
    <div className="radio-button-group">
      <div
        className={`radio-button-group__options ${
          !!displayRow ? "radio-button-group__options--row" : ""
        }`}
      >
        {options.map(option => (
          <Field
            key={option.id}
            component={RadioButton}
            name={name}
            label={option.label}
            id={option.id}
            className="option-wrapper"
            customOnChange={customOnChange}
          />
        ))}
        {!!allowOther && (
          <Field
            name={name}
            component={OtherOption}
            options={options}
            otherOptionLabel={otherOptionLabel}
          />
        )}
      </div>
      {!!hint && <p className="hint">{hint}</p>}
      <FormikError name={name} />
    </div>
  );
};

FormikRadioButtonGroup.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  options: PropTypes.array.isRequired,
  otherOptionLabel: PropTypes.string,
  customOnChange: PropTypes.func,
  displayRow: PropTypes.bool,
  allowOther: PropTypes.bool,
};

export default FormikRadioButtonGroup;
