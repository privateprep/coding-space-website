import React from "react";
import { Field } from "formik";

import FormikAccept from "./FormikAccept";
import FormikError from "./FormikError";
import FormikRadioButtonGroup from "./FormikRadioButtonGroup";
import GenderField from "./GenderField";
import CustomRadioField from "./CustomRadioField";

const FormField = ({ field }) => {
  if (field.displayFullWidth) {
    return (
      <div className="form-field form-field--full-width">
        <label>{field.label}</label>
        {!!field.context && (
          <p className="form-field__context">{field.context}</p>
        )}
        {field.type === "accept" && (
          <div className="input-container">
            <Field
              name={field.name}
              component={FormikAccept}
              policyName={field.policyName}
              policyPath={field.policyPath}
              prelinkText={field.prelinkText}
              hint={field.hint}
            />
            <FormikError name={field.name} />
          </div>
        )}
        {field.type === "text" && (
          <div className="input-container">
            <Field
              name={field.name}
              component="input"
              type="text"
              placeholder={field.placeholder || field.label}
            />
            <FormikError name={field.name} />
          </div>
        )}
        {field.type === "textarea" && (
          <div className="input-container">
            <Field
              name={field.name}
              component="textarea"
              rows={field.rows || 3}
              placeholder={field.placeholder || field.label}
            />
            {!!field.hint && <p className="hint">{field.hint}</p>}
            <FormikError name={field.name} />
          </div>
        )}
        {field.type === "date" && (
          <div className="input-container">
            <Field
              name={field.name}
              type="date"
              placeholder={field.placeholder || field.label}
            />
            <FormikError name={field.name} />
          </div>
        )}
        {field.type === "radio" && (
          <FormikRadioButtonGroup
            label={field.label}
            name={field.name}
            hint={field.hint}
            options={field.options}
            displayRow={field.displayRow}
            allowOther={field.allowOther}
            otherOptionLabel={field.otherOptionLabel}
          />
        )}
        {field.type === "gender" && (
          <GenderField
            label={field.label}
            name={field.name}
            options={field.options}
            displayRow={field.displayRow}
          />
        )}
        {field.type === "custom-radio" && (
          <CustomRadioField
            hint={field.hint}
            label={field.label}
            name={field.name}
            options={field.options}
          />
        )}
      </div>
    );
  }

  return (
    <div className="form-field">
      <aside>
        <label>{field.label}</label>
        {!!field.context && (
          <p className="form-field__context">{field.context}</p>
        )}
      </aside>
      {field.type === "accept" && (
        <div className="input-container">
          <Field
            name={field.name}
            component={FormikAccept}
            policyName={field.policyName}
            policyPath={field.policyPath}
            hint={field.hint}
          />
          <FormikError name={field.name} />
        </div>
      )}
      {field.type === "text" && (
        <div className="input-container">
          <Field
            name={field.name}
            component="input"
            type="text"
            placeholder={field.placeholder || field.label}
          />
          <FormikError name={field.name} />
        </div>
      )}
      {field.type === "textarea" && (
        <div className="input-container">
          <Field
            name={field.name}
            component="textarea"
            rows={field.rows || 3}
            placeholder={field.placeholder || field.label}
          />
          {!!field.hint && <p className="hint">{field.hint}</p>}
          <FormikError name={field.name} />
        </div>
      )}
      {field.type === "date" && (
        <div className="input-container">
          <Field
            name={field.name}
            type="date"
            placeholder={field.placeholder || field.label}
          />
          <FormikError name={field.name} />
        </div>
      )}
      {field.type === "radio" && (
        <FormikRadioButtonGroup
          label={field.label}
          name={field.name}
          hint={field.hint}
          options={field.options}
          displayRow={field.displayRow}
          allowOther={field.allowOther}
          otherOptionLabel={field.otherOptionLabel}
        />
      )}
      {field.type === "gender" && (
        <GenderField
          label={field.label}
          name={field.name}
          options={field.options}
          displayRow={field.displayRow}
        />
      )}
      {field.type === "custom-radio" && (
        <CustomRadioField
          hint={field.hint}
          label={field.label}
          name={field.name}
          options={field.options}
        />
      )}
      {field.type === "select" && (
        <div className="input-container">
          <Field as="select" name={field.name}>
            <option defaultValue>Select...</option>
            {field.options.map((option, i) => (
              <option key={i} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field>
          {!!field.hint && (
            <div>
              <small>{field.hint}</small>
            </div>
          )}
          <FormikError name={field.name} />
        </div>
      )}
    </div>
  );
};

export default FormField;
