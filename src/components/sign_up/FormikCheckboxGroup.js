import React from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import FormikError from "./FormikError";

import "./styles/FormikCheckboxGroup.css";

export const Checkbox = ({
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
        id={`${name}-${id}`}
        type="checkbox"
        value={id}
        checked={value.includes(id)}
        onChange={handleChange}
        onBlur={onBlur}
        className="checkbox"
        {...props}
      />
      <label className="checkbox-label" htmlFor={`${name}-${id}`}>
        {label}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  field: PropTypes.any.isRequired,
  label: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  customOnChange: PropTypes.func,
};

const FormikCheckboxGroup = ({
  name,
  hint,
  options,
  customOnChange,
  displayRow,
}) => {
  return (
    <div className="checkbox-group">
      <div
        className={`checkbox-group__options ${
          !!displayRow ? "checkbox-group__options--row" : ""
        }`}
      >
        {options.map(option => (
          <Field
            key={option.id}
            component={Checkbox}
            name={name}
            label={option.label}
            id={option.id}
            className="option-wrapper"
            customOnChange={customOnChange}
          />
        ))}
      </div>
      {!!hint && <p className="hint">{hint}</p>}
      <FormikError name={name} />
    </div>
  );
};

FormikCheckboxGroup.propTypes = {
  name: PropTypes.string.isRequired,
  hint: PropTypes.string,
  options: PropTypes.array.isRequired,
  customOnChange: PropTypes.func,
  displayRow: PropTypes.bool,
  allowOther: PropTypes.bool,
};

export default FormikCheckboxGroup;
