import * as React from "react";
import { isMobile } from "../utils/helpers";

import { useFilters } from "../hooks";
import FilterForm from "./FilterForm";

import ClassCards from "./ClassCards";

import "./ClassPanel.scss";

const seasonScore = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

const sortSemester = (a, b) => {
  const [aSeason, aYear] = a.value.split(" ");
  const [bSeason, bYear] = b.value.split(" ");

  if (aYear > bYear) return 1;
  if (aYear < bYear) return -1;

  const aSeasonScore = seasonScore[aSeason] || 4;
  const bSeasonScore = seasonScore[bSeason] || 4;

  if (aSeasonScore > bSeasonScore) return 1;
  if (aSeasonScore < bSeasonScore) return -1;

  return 0;
};

const filterTemplate = [
  {
    label: "SEMESTER",
    filterKey: "semesters",
    type: "checkbox",
    optionValueKeys: ["extras", "semesters"],
    sort: sortSemester,
  },
  {
    label: "EXPERIENCE",
    filterKey: "experiences",
    type: "checkbox",
    optionValueKeys: ["details", "experience"],
  },
  {
    label: "GENDER",
    filterKey: "genders",
    type: "checkbox",
    optionValueKeys: ["details", "gender"],
  },
  {
    label: "SKILLS",
    filterKey: "skills",
    type: "checkbox",
    optionValueKeys: ["details", "skills"],
  },
  {
    label: "LOOKING FOR",
    filterKey: "sellingPoints",
    type: "checkbox",
    optionValueKeys: ["details", "sellingPoints"],
  },
];

const ClassPanel = ({ title, experienceLevels, slugExtension }) => {
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
