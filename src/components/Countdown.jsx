import React, {useState, useEffect} from 'react';
import '../styles/countdown.css';

const TARGET = new Date('2026-03-27T09:00:00');

function getTime() {
  const diff = TARGET - new Date();
  if (diff <= 0) return {days: 0, hours: 0, minutes: 0, seconds: 0};
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  const [time, setTime] = useState(getTime);

  useEffect(() => {
    const id = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    {key: 'days', label: 'Days'},
    {key: 'hours', label: 'Hours'},
    {key: 'minutes', label: 'Minutes'},
    {key: 'seconds', label: 'Seconds'},
  ];

  return (
    <div className='countdown-wrap animate-on-scroll'>
      <div className='countdown-label-row'>Event Countdown — March 27, 2026</div>
      <div className='countdown-row'>
        {units.map(({key, label}) => (
          <div key={key} className='countdown-item'>
            <span className='countdown-num'>{String(time[key]).padStart(2, '0')}</span>
            <div className='countdown-unit'>{label}</div>
            {key === 'seconds' && <div className='countdown-seconds-bar' />}
          </div>
        ))}
      </div>
    </div>
  );
}
