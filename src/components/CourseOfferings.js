import * as React from "react";

import { Link } from "gatsby";
import moment from "moment-timezone";

import { GET } from "../utils/service";
import { groupBy, sortSemester } from "../utils/helpers";

import { useFilters } from "../hooks";
import FilterForm from "../components/FilterForm";

import "./CourseOfferings.scss";

const CourseOffering = ({
  classTypeId,
  classTypeName,
  endsAt,
  enrollmentTypes,
  isCamp,
  inSession,
  lastSessionAt,
  locationName,
  price,
  remainingCapacity,
  semester,
  sessionCount,
  startsAt,
}) => {
  let userTimeZone;
  try {
    userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch (e) {
    userTimeZone = "America/New_York";
  }

  const firstDate = moment(startsAt).tz(userTimeZone).format("MMM D");
  const lastDate = moment(lastSessionAt).tz(userTimeZone).format("MMM D");

  const dateRange =
    firstDate !== lastDate ? `${firstDate} - ${lastDate}` : firstDate;
  const classStarts = moment(startsAt).tz(userTimeZone).format("h:mm");
  const classEnds = moment(endsAt).tz(userTimeZone).format("LT");
  const timeZone = moment(startsAt).tz(userTimeZone).format("z");
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
        <h4 className="overview__dates">{dateRange}</h4>
      </div>
      <ul className="details">
        <li>
          <strong>Semester</strong> {semester}
        </li>
        <li>
          <strong>Location</strong> {locationName}
        </li>
        <li>
          <strong>{inSession ? "Next Session" : "First Session"}</strong>{" "}
          {`${firstDate}  (${
            sessionCount === 1 ? "1 Session" : `${sessionCount} Sessions`
          })`}
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
        {enrollmentTypes.map(({ buttonLabel, value }) => {
          if (value === "all") {
            return (
              <Link
                key={value}
                to={`/sign_up/classes/${classTypeId}`}
                className="link-button sign-up"
              >
                SIGN UP
              </Link>
            );
          } else if (value === "trial_class") {
            return (
              <Link
                key={value}
                to={`/sign_up/classes/${classTypeId}?trial_class=true`}
                className="link-button sign-up"
              >
                {isCamp ? "TRY A DAY" : "TRY A CLASS"}
              </Link>
            );
          } else {
            return (
              <p key={value} style={{ color: "red" }}>
                Unknown enrollmentType: {value}
              </p>
            );
          }
        })}
      </div>
    </li>
  );
};

const sortClasses = (a, b) => {
  // Sort by class cat
  if (a.categoryName > b.categoryName) return 1;
  if (a.categoryName < b.categoryName) return -1;

  // sort by semester
  sortSemester(a, b);

  // Sort by startsAt
  if (a.startsAt > b.startsAt) return 1;
  if (a.startsAt < b.startsAt) return -1;
};

// enhance class type server response
const formatResponse = classType => {
  const enrollmentTypes = classType.enrollmentTypes.map(dashboard_type => {
    const filterLabel = dashboard_type === "all" ? "Complete" : "Trial";
    const linkLabel =
      dashboard_type === "all"
        ? "SIGN UP"
        : classType.isCamp
        ? "TRY A DAY"
        : "TRY A CLASS";

    return { filterLabel, linkLabel, value: dashboard_type };
  });

  return {
    ...classType,
    enrollmentTypes,
    locationId: String(classType.locationId),
  };
};

const sortClassLocations = (a, b) => {
  /* online goes last */
  const aIsOnline = a.label.toLowerCase().includes("online");
  const bIsOnline = b.label.toLowerCase().includes("online");
  if (aIsOnline !== bIsOnline) {
    if (aIsOnline) return 1;
    if (bIsOnline) return -1;
  }

  return a.value.localeCompare(b.value);
};

const filterTemplate = [
  {
    label: "SEMESTER",
    filterKey: "semesters",
    type: "checkbox",
    optionValueKeys: ["semester"],
    sort: sortSemester,
  },
  {
    label: "LOCATION",
    filterKey: "class_location_ids",
    type: "checkbox",
    optionKeys: [], // value + label off top-level object directly
    valueKeys: ["locationId"],
    labelKeys: ["locationName"],
    sort: sortClassLocations,
  },
  {
    label: "SIGNUP TYPE",
    filterKey: "enrollmentTypes",
    type: "checkbox",
    optionKeys: ["enrollmentTypes"],
    valueKeys: ["value"],
    labelKeys: ["filterLabel"],
  },
];

const CourseOfferings = ({ courseOfferingEndpoint, isCamp = false }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [lastFetchedAt, setLastFetchedAt] = React.useState();
  const [classes, setClasses] = React.useState([]);
  const [error, setError] = React.useState();

  // setup filters
  const [filters, activeFilter, filteredClasses] = useFilters(
    filterTemplate,
    classes
  );

  // fetch inventory from PP Dashboard
  React.useEffect(() => {
    if (!isLoading && !lastFetchedAt && !error) {
      setIsLoading(true);

      GET(`${process.env.DASHBOARD_BASE_URL}${courseOfferingEndpoint}`)
        .then(({ classTypes }) => {
          setClasses(classTypes.map(formatResponse).sort(sortClasses));
          setLastFetchedAt(Date.now());
          setIsLoading(false);
        })
        .catch(err => {
          setError(err);
          setLastFetchedAt(Date.now());
        });
    }
  }, [isLoading, lastFetchedAt, error, courseOfferingEndpoint]);

  if (!!error) {
    return (
      <div className="courseOfferings" style={{ minHeight: `12rem` }}>
        <div />
        <div className="courseOfferings__content">
          <h2>Now Enrolling</h2>
          <hr />
          <p style={{ color: `var(--error)`, minHeight: `20rem` }}>
            Oh no! {error.message}
          </p>
        </div>
      </div>
    );
  }

  if (!!isLoading) {
    return (
      <div className="courseOfferings" style={{ minHeight: `20rem` }}>
        <div />
        <div className="courseOfferings__content">
          <h2>Now Enrolling</h2>
          <hr />
          <p>Loading classes...</p>
        </div>
      </div>
    );
  }

  if (!!lastFetchedAt && !!filteredClasses.length) {
    const classesBySemester = groupBy(filteredClasses, "semester");

    return (
      <div className="courseOfferings">
        <FilterForm filters={filters} activeFilter={activeFilter} />

        <div className="courseOfferings__content">
          <h2 className="title">Now Enrolling</h2>
          {Object.keys(classesBySemester)
            .sort((a, b) => {
              return sortSemester(a, b);
            })
            .map((semester, semIndex) => (
              <React.Fragment key={semIndex}>
                <h3>{semester}</h3>
                <ul className="offering-list">
                  {classesBySemester[semester].map(offering => (
                    <CourseOffering
                      key={offering.classTypeId}
                      isCamp={isCamp}
                      {...offering}
                    />
                  ))}
                </ul>
                <hr />
              </React.Fragment>
            ))}
        </div>
      </div>
    );
  }

  const areFiltersActive = Object.keys(activeFilter).some(
    filterKey => !!activeFilter[filterKey].length
  );

  return (
    <div className="courseOfferings" style={{ minHeight: `20rem` }}>
      <FilterForm filters={filters} activeFilter={activeFilter} />
      <div className="courseOfferings__content">
        <h2>Now Enrolling</h2>
        <hr />
        <p>
          {areFiltersActive ? "No matching courses" : "No upcoming offerings"}
        </p>
        <p>Contact our team to discuss other options!</p>
      </div>
    </div>
  );
};

export default CourseOfferings;
