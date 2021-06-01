import React from "react";

const FormikAccept = ({
  field: { name, value, onBlur },
  form: { setFieldValue },
  hint,
  prelinkText,
  policyName,
  policyPath,
}) => (
  <div className="accept-input-container">
    <label>{policyName}</label>
    <label className="accept-label-with-link" htmlFor={name}>
      <input
        id={name}
        name={name}
        value={value}
        checked={["true", true].includes(value)}
        onChange={e => {
          setFieldValue(name, !value); // true -> false; falsey -> true
        }}
        onBlur={onBlur}
        type="checkbox"
      />
      {`${prelinkText} `}
      <a href={policyPath} target="_blank" rel="noopener noreferrer">
        {policyName}
      </a>
      .
    </label>
    {!!hint && <p className="hint">{hint}</p>}
  </div>
);

export default FormikAccept;
