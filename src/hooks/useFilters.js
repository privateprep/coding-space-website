import * as React from "react";

// ruby's 'dig' for JS
// adapted from https://github.com/joe-re/object-dig/blob/master/src/index.js
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

// option builders
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

// builds initial filter state
// looks like `{ filterKey1: initialValue1, filterKey2, initialValue2 }`
const buildInitialFilter = (filters) =>
  filters.reduce((initialFilter, filter) => {
    initialFilter[filter.filterKey] = filter.initialValue;
    return initialFilter;
  }, {});

// callback to filter active items in collection
const filterItem = (item, activeFilter, filters) => {
  // check check filter key, try to knock out
  // only supports value collections (checkbox)
  for (const filter of filters) {
    const activeValue = activeFilter[filter.filterKey];

    if (activeValue?.length) {
      const rawValue = dig(item, filter.optionValueKeys);

      if (Array.isArray(rawValue)) {
        // filter for any overlap
        if (!activeValue.some((val) => rawValue.includes(val))) {
          return false;
        }
      } else {
        // filter for exact matching
        if (!activeValue.includes(rawValue)) {
          return false;
        }
      }
    }
  }

  return true; // nothing said no!
};

// Finally...
// the actual hook
// NOTE: currently only checkbox filters are supported

const useFilters = (filterTemplate, collection) => {
  const filters = React.useMemo(
    () =>
      filterTemplate.map((filter) => ({
        ...filter,
        options: buildOptions(collection, filter),
      })),
    [filterTemplate, collection]
  );
  const [activeFilter, setActiveFilter] = React.useState(
    buildInitialFilter(filters)
  );

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

  const activeCollection = React.useMemo(
    () => collection.filter((item) => filterItem(item, activeFilter, filters)),
    [collection, filters, activeFilter]
  );

  return [filters, activeFilter, updateActiveFilter, activeCollection];
};

export default useFilters;
