export const capitalize = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const titleize = string => {
  string = string.replace(/_id/, ""); // remove _id
  string = string.replace(/_/g, " "); // change out underscore for space
  string = string.replace(/([a-z])([A-Z])/g, "$1 $2"); // add space for camelCase
  return string
    .split(" ")
    .map(word => capitalize(word))
    .join(" ");
};

export const groupBy = (arr, key) => {
  return (arr || []).reduce(
    (acc, x = {}) => ({
      ...acc,
      [x[key]]: [...(acc[x[key]] || []), x],
    }),
    {}
  );
};

export const isMobile = _ => {
  if (typeof navigator !== "undefined") {
    return /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator?.userAgent
    );
  } else {
    return false;
  }
};

const seasonScore = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

export const sortSemester = (a, b) => {
  // from filter, class type, or semester string
  const aString = a?.value || a?.semester || a;
  const bString = b?.value || b?.semester || b;

  const aValues = aString.split(" ");
  const bValues = bString.split(" ");

  // handles multi-word semesters like Summer Camps 2021 and Fall 2021
  const { 0: aSeason, [aValues.length - 1]: aYear } = aValues;
  const { 0: bSeason, [bValues.length - 1]: bYear } = bValues;

  if (aYear > bYear) return 1;
  if (aYear < bYear) return -1;

  const aSeasonScore = seasonScore[aSeason] || 4;
  const bSeasonScore = seasonScore[bSeason] || 4;

  if (aSeasonScore > bSeasonScore) return 1;
  if (aSeasonScore < bSeasonScore) return -1;

  return 0;
};
