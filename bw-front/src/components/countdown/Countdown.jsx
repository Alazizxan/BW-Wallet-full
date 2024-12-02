import React, { useState, useEffect } from 'react';
import './Countdown.css';
import { io } from 'socket.io-client';
import { updateStatus } from "../../api/index.js";
import log from "eslint-plugin-react/lib/util/log.js";

const Countdown = () => {
  const [days, setDays] = useState('00');
  const [hoursTens, setHoursTens] = useState('0');
  const [hoursOnes, setHoursOnes] = useState('0');
  const [minutesTens, setMinutesTens] = useState('0');
  const [minutesOnes, setMinutesOnes] = useState('0');
  const [countdownDate, setCountdownDate] = useState(null);

  useEffect(() => {
    const socket = io(import.meta.env.VITE_API_BASE_URL);

    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });

    socket.on('countdownDate', (date) => {
      console.log(date)
      setCountdownDate(date);
    });

    return () => {
      socket.off('countdownDate');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (countdownDate) {
      const interval = setInterval(updateCountdown, 1000);

      return () => clearInterval(interval);
    }
  }, [countdownDate]);

  const updateCountdown = async () => {
    if (countdownDate) {
      const now = new Date().getTime();
      const distance = countdownDate - now;


      if (distance > 0) {
        setDays(String(Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, '0')));
        const hoursLeft = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutesLeft = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

        setHoursTens(Math.floor(hoursLeft / 10).toString());
        setHoursOnes((hoursLeft % 10).toString());
        setMinutesTens(Math.floor(minutesLeft / 10).toString());
        setMinutesOnes((minutesLeft % 10).toString());
      } else {
        setDays('00');
        setHoursTens('0');
        setHoursOnes('0');
        setMinutesTens('0');
        setMinutesOnes('0');

        await updateCountdown({ status: false });
        window.location.href = '/wallet';
      }
    }
  };

  return (
    <div className="countdown-container">
      <span className="countdown-text">Time left until DROPDOWN</span>
      <div className="time-items">
        <div className="time-item">
          <span className="time-number">{days}</span>
          <span className="time-label">Days</span>
        </div>
        <div className="time-item">
          <div className="time-numbers">
            <span className="time-number">{hoursTens}</span>
            <span className="time-number">{hoursOnes}</span>
          </div>
          <span className="time-label">Hours</span>
        </div>
        <div className="time-item">
          <div className="time-numbers">
            <span className="time-number">{minutesTens}</span>
            <span className="time-number">{minutesOnes}</span>
          </div>
          <span className="time-label">Minutes</span>
        </div>
      </div>
    </div>
  );
};

export default Countdown;
