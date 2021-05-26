import React, { useState, useCallback } from "react";
import moment from "moment-timezone";
import range from "lodash/range";
import "./styles/CalendarDisplay.css";

// based on https://codepen.io/zellwk/details/xNpKwp

const CalendarDisplay = ({ events }) => {
  const eventStrings = events
    .map(event => moment(event.scheduledAt).format("YYYY-MM-DD"))
    .sort();
  const firstEvent = eventStrings[0];
  const [momentMonth, setMomentMonth] = useState(
    !!firstEvent ? moment(firstEvent) : moment() //  first event or today
  );
  const monthString = momentMonth.format("YYYY-MM");
  const numDays = moment(momentMonth, "YYYY-MM").daysInMonth();
  const dateStrings = range(1, numDays + 1).map(day =>
    day < 10 ? `${monthString}-0${day}` : `${monthString}-${day}`
  );

  const hasEvent = useCallback(
    dateString => eventStrings.includes(dateString),
    [eventStrings]
  );

  const onLastMonthClick = () =>
    setMomentMonth(moment(monthString).subtract(1, "M"));

  const onNextMonthClick = () =>
    setMomentMonth(moment(monthString).add(1, "M"));

  return (
    <div className="calendar">
      <div className="month-indicator">
        <button type="button" onClick={onLastMonthClick}>
          {`<`}
        </button>
        <time dateTime={monthString}>{momentMonth.format("MMMM YYYY")}</time>
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
          let dateMoment = moment(dateString);
          return (
            <button
              key={dateString}
              type="button"
              className={hasEvent(dateString) ? "has-event" : ""}
              style={
                dayIndex === 0
                  ? { gridColumn: dateMoment.format("ddd") } // first day of month starts grid layout
                  : {}
              }
            >
              <time dateTime={dateString}>{dateMoment.format("D")}</time>
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
