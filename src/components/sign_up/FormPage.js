import React from "react";
import FormField from "./FormField";
import Wizard from "./Wizard";

const FormPage = ({ title, subtitle, fields, parentState: { values } }) => (
  <Wizard.Page>
    {() => (
      <React.Fragment>
        <h2 className="title">{title}</h2>
        {!!subtitle && <p className="subtitle">{subtitle}</p>}
        {fields
          .filter(
            field =>
              !field.displayUnless ||
              ![true, "true", ""].includes(values[field.displayUnless])
          )
          .map(field => (
            <FormField field={field} key={field.name} />
          ))}
      </React.Fragment>
    )}
  </Wizard.Page>
);

export default FormPage;
