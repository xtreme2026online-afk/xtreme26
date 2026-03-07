import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {EVENTS} from '../data/events';
import EventModal from './EventModal';
import '../styles/events.css';

export default function Events() {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  // Initialize scroll animations once
  useEffect(() => {
    const cards = document.querySelectorAll('.event-card.animate-on-scroll');
    // Remove 'visible' first so the transition replays
    cards.forEach((c) => c.classList.remove('visible'));
    // Re-add 'visible' after a microtask so the browser picks up the class removal
    const id = setTimeout(() => {
      cards.forEach((c) => c.classList.add('visible'));
    }, 50);
    return () => clearTimeout(id);
  }, []);

  return (
    <section id='events'>
      <div className='section-inner'>
        <div className='section-tag animate-on-scroll'>Our Events</div>
        <h2 className='section-title animate-on-scroll'>
          <em>Compete.</em> Create. Conquer.
        </h2>
        <p className='section-subtitle animate-on-scroll'>Eight electrifying events across technical and non-technical domains — each designed to test your limits.</p>

        <div className='events-grid'>
          {EVENTS.map((ev, i) => (
            <div key={ev.id} className={`event-card animate-on-scroll delay-${(i % 5) + 1}`}>
              <div className='event-card-glow' />
              <div className='event-card-header'>
                <span className='event-card-icon'>{ev.icon}</span>
                <div className='event-card-title'>{ev.title}</div>
                <div className='event-card-tagline'>{ev.subtitle}</div>
              </div>

              <div className='event-card-body'>
                <p className='event-card-desc'>{ev.description.slice(0, 115)}…</p>
                <div className='event-card-meta'>
                  <span className='event-meta-item'>👥 {ev.size} members</span>
                  {ev.time && <span className='event-meta-item'>⏱ {ev.time}</span>}
                  <span className='event-meta-item'>📍 {ev.venue}</span>
                </div>
              </div>

              <div className='event-card-footer'>
                <div>
                  {ev.prize && (
                    <>
                      <span className='event-prize-label'>Prize Pool</span>
                      <div className='event-prize'>{ev.prize}</div>
                    </>
                  )}
                </div>
                <button className='event-details-btn' onClick={() => setSelected(ev)}>
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
    </section>
  );
}
