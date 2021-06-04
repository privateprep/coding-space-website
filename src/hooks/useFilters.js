import * as React from "react";

// option builders!

// 'dig' adapted from https://github.com/joe-re/object-dig/blob/master/src/index.js
const dig = (target, keys = []) => {
  let digged = target;
  for (const key of keys) {
    if (typeof digged === "undefined" || digged === null) {
      return undefined;
    }
    digged = digged[key];
  }
  return digged;
};

const buildOption = (name, value, label) => {
  const id = `${name}_${String(value).toLowerCase().split(" ").join("_")}`;

  return { id, name, value, label };
};

const buildOptions = (collection, filter) => {
  let options = [];

  for (let item of collection) {
    const label = dig(item, filter.optionLabelKeys);
    const rawValue = dig(item, filter.optionValueKeys);

    if (Array.isArray(rawValue)) {
      // associated with many
      for (let value of rawValue) {
        if (!!value && !options.some((opt) => opt.value === value)) {
          const option = buildOption(filter.filterKey, value, label);
          options.push(option);
        }
      }
    } else {
      // just a string or id number
      if (!!rawValue && !options.some((opt) => opt.value === rawValue)) {
        const option = buildOption(filter.filterKey, rawValue, label);
        options.push(option);
      }
    }
  }

  return options;
};

// looks like `{ filterKey1: initialValue1, filterKey2, initialValue2 }`
const buildInitialFilter = (filters) =>
  filters.reduce((initialFilter, filter) => {
    initialFilter[filter.filterKey] = filter.initialValue;
    return initialFilter;
  }, {});

// actual hook

const useFilters = (filterTemplate, collection) => {
  const filters = filterTemplate.map((filter) => ({
        ...filter,
        options: buildOptions(collection, filter),
      }));

  const [activeFilter, setActiveFilter] = React.useState(
    buildInitialFilter(filters)
  );

  // NOTE: currently only checkbox supported
  const updateActiveFilter = React.useCallback((filter, event) => {
    const value = event.target.value;

    if (event.target.checked) {
      // add value
      setActiveFilter((current) => ({
        ...current,
        [filter.filterKey]: [...current[filter.filterKey], value],
      }));
    } else {
      // filter out value
      setActiveFilter((current) => ({
        ...current,
        [filter.filterKey]: current[filter.filterKey].filter(
          (val) => val !== value
        ),
      }));
    }
  }, []);

  return [filters, activeFilter, updateActiveFilter];
};

export default useFilters;
