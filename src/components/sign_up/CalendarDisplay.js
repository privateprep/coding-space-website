import React, { useState, useCallback } from "react";
import { DateTime } from "luxon";
import range from "lodash/range";
import "./styles/CalendarDisplay.css";

// based on https://codepen.io/zellwk/details/xNpKwp

const CalendarDisplay = ({ events }) => {
  const eventStrings = events
    .map(event => DateTime.fromISO(event.scheduledAt).toFormat("y'-'MM'-'dd"))
    .sort();
  const firstEvent = eventStrings[0];
  const [month, setMonth] = useState(
    !!firstEvent ? DateTime.fromISO(firstEvent) : DateTime.now() //  first event or today
  );
  const monthString = month.toFormat("y-MM"); // 2021-06
  const numDays = month.daysInMonth;
  const dateStrings = range(1, numDays + 1).map(day =>
    day < 10 ? `${monthString}-0${day}` : `${monthString}-${day}`
  );

  const hasEvent = useCallback(
    dateString => eventStrings.includes(dateString),
    [eventStrings]
  );

  const onLastMonthClick = () => setMonth(month.minus({ months: 1 }));

  const onNextMonthClick = () => setMonth(month.plus({ months: 1 }));

  return (
    <div className="calendar">
      <div className="month-indicator">
        <button type="button" onClick={onLastMonthClick}>
          {`<`}
        </button>
        <time dateTime={monthString}>{month.toFormat("MMMM yyyy")}</time> //
        June 2021
        <button type="button" onClick={onNextMonthClick}>
          {`>`}
        </button>
      </div>
      <div className="day-of-week">
        <div>Su</div>
        <div>Mo</div>
        <div>Tu</div>
        <div>We</div>
        <div>Th</div>
        <div>Fr</div>
        <div>Sa</div>
      </div>
      <div className="date-grid">
        {dateStrings.map((dateString, dayIndex) => {
          // "2021-06-01"
          let date = DateTime.fromISO(dateString); // DateTime object
          return (
            <button
              key={dateString}
              type="button"
              className={hasEvent(dateString) ? "has-event" : ""}
              style={
                dayIndex === 0
                  ? { gridColumn: date.toFormat("EEE") } // first day of month starts grid layout -- Mon
                  : {}
              }
            >
              <time dateTime={dateString}>{date.toFormat("d")}</time> // 14
            </button>
          );
        })}
      </div>
    </div>
  );
};

CalendarDisplay.defaultProps = {
  events: [{ scheduledAt: "2019-01-01 12:00" }],
};

export default CalendarDisplay;
