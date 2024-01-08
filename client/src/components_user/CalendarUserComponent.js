import React, { useEffect, useState } from "react";
import "../css/CalendarComponent.css";

const CalendarUserComponent = (props) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1); // Adjusted to start from 1
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [daysArray, setDaysArray] = useState([]);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const handleDateClick = (day) => {
    const selectedDate = new Date(currentYear, currentMonth - 1, day);
    const dayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    const formattedSelectedDate = {
      day: day,
      month: currentMonth,
      year: currentYear,
      dayName: dayName,
    };

    setSelectedDate(formattedSelectedDate);
    props.onDateSelect(formattedSelectedDate);
  };

  const renderCalendar = () => {
    let firstDayofMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
    let lastDateofMonth = new Date(currentYear, currentMonth, 0).getDate();
    let lastDayofMonth = new Date(currentYear, currentMonth - 1, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();
    let days = [];

    for (let i = firstDayofMonth; i > 0; i--) {
      days.push(<li key={`inactive-prev-${lastDateofLastMonth - i + 1}`} className="inactive">{lastDateofLastMonth - i + 1}</li>);
    }

    for (let i = 1; i <= lastDateofMonth; i++) {
      const isToday =
        i === new Date().getDate() &&
        currentMonth === new Date().getMonth() + 1 &&
        currentYear === new Date().getFullYear()
          ? "active"
          : "";

      const handleClick = () => handleDateClick(i);

      if (
        (i >= new Date().getDate() &&
          currentMonth === new Date().getMonth() + 1 &&
          currentYear === new Date().getFullYear()) ||
        (currentMonth > new Date().getMonth() + 1 &&
          currentYear === new Date().getFullYear()) ||
        (currentYear > new Date().getFullYear())
      ) {
        days.push(
          <li key={`active-${i}`} className={isToday} onClick={handleClick}>
            {i}
          </li>
        );
      } else {
        days.push(<li key={`inactive-current-${i}`} className="inactive">{i}</li>);
      }
    }

    for (let i = lastDayofMonth; i < 6; i++) {
      days.push(<li key={`inactive-next-${i - lastDayofMonth + 1}`} className="inactive">{i - lastDayofMonth + 1}</li>);
    }

    setDaysArray(days);
  };

  useEffect(() => {
    renderCalendar();
    console.log("Selected Date:", selectedDate);
  }, [currentMonth, currentYear, selectedDate]);

  useEffect(() => {
    // Set selectedDate to the current date if it's initially null
    if (!selectedDate) {
      const currentDate = new Date();
      handleDateClick(currentDate.getDate());
    }
  }, [selectedDate]);
  return (
    <div className="wrapper" id="userCalendar">
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      <header>
        <div className="icons">
          <span id="prev" className="material-symbols-outlined">chevron_left</span>
          <p className="current-date"></p>
          <span id="next" className="material-symbols-outlined">chevron_right</span>
        </div>
      </header>
      <div className="calendar">
        <ul className="weeks">
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
        <ul className="days">
        </ul>
      </div>
    </div>
  );
};

export default CalendarUserComponent;
