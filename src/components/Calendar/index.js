import React, { useState, useEffect } from 'react';
import styles from './Calendar.module.scss';

function Calendar() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const daysOfWeek = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];
  const dayNames = [
    'Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота'
  ];
  const monthNames = [
    'Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
  ];

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const firstDayIndex = new Date(selectedYear, selectedMonth, 1).getDay();
  const daysToShowFromNextMonth = 7 - (daysInMonth + firstDayIndex) % 7;

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prevYear => prevYear - 1);
    } else {
      setSelectedMonth(prevMonth => prevMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prevYear => prevYear + 1);
    } else {
      setSelectedMonth(prevMonth => prevMonth + 1);
    }
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendar__info}>
        <p className={styles.__info__time}>{currentTime.toLocaleTimeString()}</p>
        <p>{dayNames[currentTime.getDay()]}, {monthNames[currentTime.getMonth()]} {currentTime.getDate()}, {selectedYear}</p>
      </div>

      <hr></hr>

      <div className={styles.calendar__header}>
        <button onClick={handlePrevMonth}>&lt;</button>
        <h2>{monthNames[selectedMonth]} {selectedYear} р.</h2>
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      <div className={styles.calendar__weekdays}>
        {daysOfWeek.map(day => (
          <div key={day} className={styles.calendar__weekday}>
            {day}
          </div>
        ))}
      </div>

      <div className={styles.calendar__grid}>
        {[...Array(daysInMonth + firstDayIndex + daysToShowFromNextMonth)].map((_, index) => {
          const dayIndex = index - firstDayIndex + 1;
          const isPreviousMonth = dayIndex <= 0;
          const isNextMonth = dayIndex > daysInMonth;

          const day = isPreviousMonth
            ? new Date(selectedYear, selectedMonth - 1, daysInMonth + dayIndex)
            : isNextMonth
              ? new Date(selectedYear, selectedMonth + 1, dayIndex - daysInMonth)
              : new Date(selectedYear, selectedMonth, dayIndex);

          const isToday =
            selectedYear === new Date().getFullYear() &&
            selectedMonth === new Date().getMonth() &&
            day.getDate() === new Date().getDate();

          return (
            <div
              key={index}
              className=
              {`${styles.calendar__day} ${isToday ? styles.current__day : ''}
                ${(isPreviousMonth || isNextMonth) ? styles.other__month : ''}`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
