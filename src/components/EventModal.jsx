import React, {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Button from './Button';
import '../styles/events.css';

export default function EventModal({event, onClose}) {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className='modal-overlay' onClick={handleOverlay}>
      <div className='modal-box'>
        <div className='modal-header'>
          <button className='modal-close' onClick={onClose}>
            ✕
          </button>
          <div style={{fontSize: '3rem', marginBottom: '.75rem'}}>{event.icon}</div>
          <div
            style={{
              fontFamily: 'Cinzel, serif',
              fontSize: '1.8rem',
              color: 'white',
              marginBottom: '.5rem',
            }}>
            {event.title}
          </div>
          <div className='event-card-tagline' dangerouslySetInnerHTML={{__html: event.subtitle}}></div>
        </div>

        <div className='modal-body'>
          <p className='modal-desc'>{event.description}</p>

          <div className='modal-section-title'>Event Details</div>
          <div className='venue-box'>
            {[
              ['📍', 'Venue', event.venue],
              event.time ? ['🕘', 'Time', event.time] : null,
              ['👥', 'Team Size', `${event.size} members`],
              event.prize ? ['🏆', 'Prize Pool', event.prize] : null,
            ]
              .filter(Boolean)
              .map(([icon, label, val]) => (
                <div key={label}>
                  <div className='venue-item-label'>
                    {icon} {label}
                  </div>
                  <div className='venue-item-val'>{val}</div>
                </div>
              ))}
          </div>

          {event.topics && (
            <>
              <div className='modal-section-title'>Suggested Topics</div>
              <ul className='rules-list'>
                {event.topics.map((topic, i) => (
                  <li key={i}>{topic}</li>
                ))}
              </ul>
            </>
          )}

          <div className='modal-section-title'>Rules &amp; Regulations</div>
          <ol className='rules-list'>
            {event.rules.map((rule, i) => (
              <li key={i}>{rule}</li>
            ))}
          </ol>

          <div className='modal-actions'>
            <Button
              variant='primary'
              onClick={() => {
                onClose();
                navigate('/register');
              }}>
              Register for This Event
            </Button>
            <Button variant='secondary' onClick={onClose}>
              Back to Events
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
