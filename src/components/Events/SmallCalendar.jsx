
// frontend/src/components/Events/SmallCalendar


import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { API_BASE_URL } from '../../utils/api';
import axios from 'axios';
import './SmallCalendar.css';

export default function SmallCalendar() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventMap, setEventMap] = useState({});
  const [viewDate, setViewDate] = useState(new Date()); // controls month/year

  useEffect(() => {
    axios.get(`${API_BASE_URL}/events`)
      .then(res => {
        const events = res.data;
        const mapped = {};
        events.forEach(event => {
          const dateKey = new Date(event.startDate).toISOString().split('T')[0];
          if (!mapped[dateKey]) mapped[dateKey] = [];
          mapped[dateKey].push(event);
        });
        setEventMap(mapped);
      })
      .catch(err => console.error('Failed to fetch events:', err));
  }, []);

  const formatted = selectedDate.toISOString().split('T')[0];
  const todayEvents = eventMap[formatted] || [];



const fullDate = selectedDate.toLocaleDateString('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});

  const currentMonth = viewDate.toLocaleDateString('en-US', { month: 'long' });
const currentYear = viewDate.getFullYear();

  // Navigation handlers
const incrementMonth = (amount) => {
  const newDate = new Date(viewDate);
  newDate.setMonth(newDate.getMonth() + amount);
  setViewDate(newDate);
};

const incrementYear = (amount) => {
  const newDate = new Date(viewDate);
  newDate.setFullYear(newDate.getFullYear() + amount);
  setViewDate(newDate);
};

  const weekday = selectedDate.toLocaleDateString('en-US', { weekday: 'long' });
  const monthYear = selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div>
      <div className="calendar-header">
   <div className="weekday">{weekday}</div>
<div className="month-year">{selectedDate.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric'
})}</div>

        <div className="nav-controls">
  <div className="month-nav">
    <button onClick={() => incrementMonth(-1)}>{'<'}</button>
    <span>{currentMonth}</span>
    <button onClick={() => incrementMonth(1)}>{'>'}</button>
  </div>
  <div className="year-nav">
    <button onClick={() => incrementYear(-1)}>{'<'}</button>
    <span>{currentYear}</span>
    <button onClick={() => incrementYear(1)}>{'>'}</button>
  </div>
</div>

      </div>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        activeStartDate={viewDate}
        onActiveStartDateChange={({ activeStartDate }) => setViewDate(activeStartDate)}
        tileContent={({ date }) => {
          const key = date.toISOString().split('T')[0];
          return eventMap[key] ? <div className="dot" /> : null;
        }}
        showNavigation={false}
      />

      {todayEvents.length > 0 && (
        <div className="event-details">
          <h4>Events on {formatted}:</h4>
          {todayEvents.map((event, idx) => (
            <div key={idx}>
              <strong>{event.title}</strong>
              <p>{event.description || 'No description'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
