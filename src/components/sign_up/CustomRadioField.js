import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import FormikError from "./FormikError";

import { RadioButton } from "./FormikRadioButtonGroup";
import "./styles/FormikRadioButtonGroup.css";

const SelfIdentification = ({
  field: { name, value, onChange, onBlur },
  form: { setFieldValue, setFieldTouched },
  options,
  ...props
}) => {
  const [isSelected, setIsSelected] = useState(false);

  const radioOptions = options.map(o => o.id);
  const radioOptionValues = [`Prefer not to answer - ${name}`, ...radioOptions];

  // is another option is selected, clear this field
  useEffect(() => {
    const anotherOptionSelected = radioOptionValues.includes(value);

    if (anotherOptionSelected && isSelected) {
      setIsSelected(false);
    }
  }, [isSelected, setIsSelected, value]);

  const onSelect = () => {
    setFieldValue(name, ""); // clears other options
    setFieldTouched(name, false); // ensures no error shown, yet
    setIsSelected(true);
  };

  return (
    <div className="option-wrapper">
      <input
        id={`self_id-${name}`}
        type="radio"
        checked={isSelected}
        onChange={onSelect}
        className="radio-button"
      />
      <label
        className="radio-button-label"
        htmlFor={`self_id-${name}`}
        style={{ flexBasis: "auto" }}
      >
        Self Identification
      </label>
      <input
        name={name}
        type="text"
        value={isSelected ? value : ""}
        placeholder="Enter..."
        onChange={onChange}
        onBlur={onBlur}
        onClick={() => {
          setFieldValue(name, "");
          setIsSelected(true);
        }}
        className="radio-button"
        {...props}
      />
    </div>
  );
};

const CustomRadioField = ({ hint, name, options = [] }) => {
  return (
    <div className="radio-button-group">
      <div className="radio-button-group__options">
        {options.map(option => (
          <Field
            key={option.id}
            component={RadioButton}
            name={name}
            label={option.label}
            id={option.id}
            className="option-wrapper"
          />
        ))}
        <Field name={name} component={SelfIdentification} options={options} />
        <Field
          component={RadioButton}
          name={name}
          label="Prefer not to answer"
          id={`Prefer not to answer - ${name}`}
          className="option-wrapper"
        />
        {!!hint && (
          <div>
            <small>{hint}</small>
          </div>
        )}
        <FormikError name={name} />
      </div>
    </div>
  );
};

CustomRadioField.propTypes = {
  hint: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array,
};

export default CustomRadioField;
