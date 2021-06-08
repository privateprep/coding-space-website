import * as React from "react";
import { navigate } from "gatsby";
import { Formik, Field, useFormikContext } from "formik";

import { buildQueryString } from "../utils/service";

import "./FilterForm.scss";

const FilterCheckboxGroup = ({ filter }) => {
  const labelId = `${filter.filterKey}_label`;

  return (
    <div className="filter-group">
      <h4 className="filter-group__label" id={labelId}>
        {filter.label}
      </h4>
      <ul
        className="filter-group__options"
        role="group"
        aria-labelledby={labelId}
      >
        {filter.options.map((opt) => (
          <li className="filter-group__options__item" key={opt.id}>
            <Field
              type={filter.type}
              id={opt.id}
              name={opt.name}
              value={opt.value}
            />
            <label htmlFor={opt.id}>{opt.label}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

// based off of formik's AutoSave example
const SubmitOnChange = () => {
  const formik = useFormikContext();

  React.useEffect(() => {
    formik.submitForm();
  }, [formik.submitForm, formik.values]);

  return null;
};

const FilterForm = ({ filters, activeFilter }) => {
  return (
    <Formik
      initialValues={activeFilter}
      onSubmit={async (values) => {
        const nextSearch = buildQueryString(values);
        const nextPath = nextSearch
          ? `${window.location.pathname}?${nextSearch}`
          : window.location.pathname;
        navigate(nextPath, {
          replace: true,
          state: { disableScrollUpdate: true },
        });
      }}
      enableReinitialize // allows initialValues to update
    >
      {(formik) => (
        <form
          className="FilterForm"
          onSubmit={formik.handleSubmit}
        >
          <SubmitOnChange />
          {filters.map((filter, filterIndex) => (
            <FilterCheckboxGroup key={filterIndex} filter={filter} />
          ))}
        </form>
      )}
    </Formik>
  );
};

export default FilterForm;
