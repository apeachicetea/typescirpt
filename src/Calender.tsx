import React, { useState } from "react";
import Calendar from "react-calendar";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 250px;
  justify-content: center;
  align-items: center;
  .react-calendar__navigation {
    display: flex;

    .react-calendar__navigation__label {
      font-weight: bold;
    }

    .react-calendar__navigation__arrow {
      flex-grow: 0.333;
    }
  }
  .react-calendar__month-view__weekdays {
    text-align: center;
    font-weight: bold;
    text-decoration: underline;
  }
`;

function Calender() {
  const [value, onChange] = useState(new Date());
  console.log(value);

  return (
    <CalendarContainer>
      <Calendar onChange={onChange} value={value} />
      <div>{moment(value).format("YYYY-MM-DD")}</div>
    </CalendarContainer>
  );
}

export default Calender;
