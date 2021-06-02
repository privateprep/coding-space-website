import * as React from "react";

import { Link } from "gatsby";
import moment from "moment-timezone";

import { GET } from "../utils/service";
import { groupBy } from "../utils/helpers";

import "./CourseOfferings.css";

const CourseOffering = ({
  isCamp,
  classTypeId,
  classTypeName,
  sessionCount,
  inSession,
  remainingCapacity,
  price,
  startsAt,
  endsAt,
  lastSessionAt,
  locationName,
  enrollmentTypes,
}) => {
  let userTimeZone;
  try {
    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    userTimeZone = "America/New_York";
  }

  const firstDate = moment(startsAt)
    .tz(userTimeZone)
    .format("MMM D");
  const lastDate = moment(lastSessionAt)
    .tz(userTimeZone)
    .format("MMM D");

  const dateRange = firstDate !== lastDate ? `${firstDate} - ${lastDate}` : firstDate;
  const classStarts = moment(startsAt)
    .tz(userTimeZone)
    .format("h:mm");
  const classEnds = moment(endsAt)
    .tz(userTimeZone)
    .format("LT");
  const timeZone = moment(startsAt)
    .tz(userTimeZone)
    .format("z");
  const scheduledTimeRange = `${classStarts} - ${classEnds} ${timeZone}`;

  return (
    <li key={classTypeId} className="class-category-offering__list__item">
      <div className="icon">
        <span className="abbrev">{classTypeName[0]}</span>
      </div>
      <div className="overview">
        <h3 className="overview__name">{classTypeName}</h3>
        {!!isCamp && <h4 className="overview__weekdays">Monday - Friday</h4>}
        <h4 className="overview__time">{scheduledTimeRange}</h4>
      </div>
      <ul className="details">
        <li>
          <strong>Location</strong> {locationName}
        </li>
        <li>
          <strong>Dates</strong>
          {` ${sessionCount === 1 ? `1 Session` : `${sessionCount} Sessions`} | ${dateRange}`}
        </li>
        <li>
          <strong>{inSession ? "Next Session" : "First Session"}</strong>{" "}
          {firstDate}
        </li>
        <li>
          <strong>Price</strong> <sup>$</sup>
          {price}
        </li>
        {remainingCapacity < 10 && (
          <li>
            <strong className="near-capacity">
              {`${remainingCapacity} Seats Remaining`}
            </strong>
          </li>
        )}
      </ul>
      <div className="actions">
        {enrollmentTypes.map(type => {
          if (type === "all") {
            return (
              <Link
                key={type}
                to={`/sign_up/classes/${classTypeId}`}
                className="link-button sign-up"
              >
                SIGN UP
              </Link>
            );
          } else if (type === "trial_class") {
            return (
              <Link
                key={type}
                to={`/sign_up/classes/${classTypeId}?trial_class=true`}
                className="link-button sign-up"
              >
                {isCamp ? "TRY A DAY" : "TRY A CLASS"}
              </Link>
            );
          } else {
            return (
              <p key={type} style={{ color: "red" }}>
                Unknown enrollmentType: {type}
              </p>
            );
          }
        })}
      </div>
    </li>
  );
};

const daySorter = {
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
  sunday: 7,
};

const sortClasses = (a, b) => {
  // Sort by class cat
  if (a.categoryName > b.categoryName) return 1;
  if (a.categoryName < b.categoryName) return -1;

  // sort day of week
  let day1 = daySorter[a.classTypeName.split(" ")[0].toLowerCase()] || 10;
  let day2 = daySorter[b.classTypeName.split(" ")[0].toLowerCase()] || 10;
  if (day1 > day2) return 1;
  if (day1 < day2) return -1;

  // Sort by startsAt
  if (a.startsAt > b.startsAt) return 1;
  if (a.startsAt < b.startsAt) return -1;
};

const CourseOfferings = ({
  courseOfferingEndpoint,
  isCamp,
  filters = [], // TODO: build me from res
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastFetchedAt, setLastFetchedAt] = React.useState();
  const [completeOfferings, setCompleteOfferings] = React.useState([]);
  const [filteredOfferings, setFilteredOfferings] = React.useState([]);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    if (!isLoading && !lastFetchedAt && !error) {
      setIsLoading(true);

      GET(courseOfferingEndpoint)
        .then(({ classTypes }) => {
          const classes = classTypes; // filter me?
          setCompleteOfferings(classes.sort(sortClasses));
          setLastFetchedAt(Date.now());
          setIsLoading(false);
        })
        .catch(err => {
          setError(err);
          setLastFetchedAt(Date.now());
        });
    }
  }, [isLoading, lastFetchedAt, error, courseOfferingEndpoint]);

  const filterClasses = e => {
    const filter = e.target.value;
    if (filter === "none") {
      setFilteredOfferings([]);
    } else {
      const filteredOfferings = completeOfferings.filter(classOffering =>
        classOffering.classTypeName.includes(filter)
      );
      setFilteredOfferings(filteredOfferings);
    }
  };

  if (!!error) {
    return (
      <div className="courseOfferings" style={{ minHeight: `12rem` }}>
        <h2>Now Enrolling</h2>
        <hr />
        <p style={{ color: `var(--error)`, minHeight: `20rem` }}>
          Oh no! {error.message}
        </p>
      </div>
    );
  }

  if (!!isLoading) {
    return (
      <div className="courseOfferings" style={{ minHeight: `20rem` }}>
        <h2>Now Enrolling</h2>
        <hr />
        <p>Loading classes...</p>
      </div>
    );
  }

  let classOfferings = !!filteredOfferings.length
    ? filteredOfferings
    : completeOfferings;
  if (!!lastFetchedAt && !!classOfferings.length) {
    const classesByCategory = groupBy(classOfferings, "categoryName");
    const numCategories = Object.keys(classesByCategory).length;

    return (
      <div className="courseOfferings">
        <h2>Now Enrolling</h2>
        {!!filters.length && (
          <div className="class-filters">
            <h3>Filters</h3>
            {/* eslint-disable-next-line */}
            <select onChange={filterClasses}>
              {filters.map(filter => (
                <option key={filter} value={filter}>
                  {filter}
                </option>
              ))}
            </select>
          </div>
        )}

        {numCategories > 1 ? (
          // probably GirlCode
          Object.keys(classesByCategory)
            .sort((a, b) => {
              // beg comes first
              return a.localeCompare(b)
            })
            .map((categoryName, catIndex) => (
              <React.Fragment key={catIndex}>
                <h3>{categoryName}</h3>
                <ul className="offering-list">
                  {classesByCategory[categoryName].map(offering => (
                    <CourseOffering
                      key={offering.classTypeId}
                      isCamp={isCamp}
                      {...offering}
                    />
                  ))}
                </ul>
                <hr />
              </React.Fragment>
            ))
        ) : (
          // normal case
          <ul className="offering-list">
            {classOfferings.map(offering => (
              <CourseOffering
                key={offering.classTypeId}
                isCamp={isCamp}
                {...offering}
              />
            ))}
          </ul>
        )}
      </div>
    );
  }

  return (
    <div className="courseOfferings">
      <h2>No upcoming offerings</h2>
    </div>
  );
};


export default CourseOfferings;
