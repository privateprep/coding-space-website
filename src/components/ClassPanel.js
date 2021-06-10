import * as React from "react";
import { isMobile } from "../utils/helpers";

import { useFilters } from "../hooks";
import FilterForm from "./FilterForm";

import ClassCards from "./ClassCards";

import "./ClassPanel.scss";

const ClassPanel = ({
  title,
  experienceLevels,
  filterTemplate,
  slugExtension,
}) => {
  const [filters, activeFilter, activeLevels] = useFilters(
    filterTemplate,
    experienceLevels
  );

  return (
    <div className="ClassPanel">
      {!!title && (
        <div className="ClassPanel__title">
          <h2>{title}</h2>
        </div>
      )}
      {!!isMobile() ? (
        <details className="custom-details-tag">
          <summary>Filter By </summary>
          <FilterForm activeFilter={activeFilter} filters={filters} />
        </details>
      ) : (
        <FilterForm activeFilter={activeFilter} filters={filters} />
      )}
      <ClassCards activeLevels={activeLevels} slugExtension={slugExtension} />
    </div>
  );
};

export default ClassPanel;
