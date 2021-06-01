import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Field } from "formik";
import FormikError from "./FormikError";

import { RadioButton } from "./FormikRadioButtonGroup";
import "./styles/FormikRadioButtonGroup.css";

const options = [
  { label: "Female", id: "Female" },
  { label: "Male", id: "Male" },
];

const radioOptionValues = ["Female", "Male", "Prefer not to answer"];

const SelfIdentification = ({
  field: { name, value, onChange, onBlur },
  form: { setFieldValue, setFieldTouched },
  ...props
}) => {
  const [isSelected, setIsSelected] = useState(false);

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
    setIsSelected(true); // enables enter field
  };

  return (
    <div className="option-wrapper">
      <input
        id="self_id"
        type="radio"
        checked={isSelected}
        onChange={onSelect}
        className="radio-button"
      />
      <label
        className="radio-button-label"
        htmlFor="self_id"
        style={{ flexBasis: "auto" }}
      >
        Self Identification
      </label>
      <input
        name={name}
        type="text"
        value={isSelected ? value : ""}
        disabled={!isSelected}
        placeholder="Enter..."
        onChange={onChange}
        onBlur={onBlur}
        className="radio-button"
        {...props}
      />
    </div>
  );
};

const GenderField = ({ name, displayRow }) => {
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
          id="Prefer not to answer"
          className="option-wrapper"
        />
        <FormikError name={name} />
      </div>
    </div>
  );
};

GenderField.propTypes = {
  name: PropTypes.string.isRequired,
  displayRow: PropTypes.bool,
  allowOther: PropTypes.bool,
};

export default GenderField;
