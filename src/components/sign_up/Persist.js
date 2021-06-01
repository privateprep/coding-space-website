import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useFormikContext } from "formik";

const filterValues = (values, omittedFields) => {
  if (!omittedFields.length) return values;

  const { [omittedFields.pop()]: omitted, ...rest } = values;

  return filterValues(rest, omittedFields);
};

const filterData = (data, omittedFields) => {
  // isSubmitting results in a blocked button if saved and the user exits early
  const { isSubmitting, values, ...rest } = data;
  const filteredValues = filterValues(values, omittedFields);

  return { ...rest, values: filteredValues };
};

const Persist = ({ name, omittedFields, isSessionStorage = false }) => {
  const formik = useFormikContext();

  const persistedData = isSessionStorage
    ? window.sessionStorage.getItem(name)
    : window.localStorage.getItem(name);

  useEffect(() => {
    try {
      saveForm(formik, omittedFields);
    } catch {
      console.log("auto save failed");
    }
  }, [formik]);

  // rehydrates the form from stored data
  useEffect(() => {
    if (!!persistedData) {
      formik.setFormikState(JSON.parse(persistedData));
    }
  }, [name]);

  const saveForm = (data, omittedFields) => {
    const filteredData = filterData(data, omittedFields);
    const formData = JSON.stringify(filteredData);

    if (!!isSessionStorage) {
      window.sessionStorage.setItem(name, formData);
    } else {
      window.localStorage.setItem(name, formData);
    }
  };

  return null;
};

Persist.propTypes = {
  name: PropTypes.string.isRequired,
  omittedFields: PropTypes.array,
  isSessionStorage: PropTypes.bool,
};

export default Persist;
