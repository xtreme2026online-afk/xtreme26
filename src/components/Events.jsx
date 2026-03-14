import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {EVENTS} from '../data/events';
import EventModal from './EventModal';
import '../styles/events.css';
import Button from './Button';

export default function Events() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');
  // State to track which tab is active
  const [activeTab, setActiveTab] = useState('technical');
  const navigate = useNavigate();

  // Initialize scroll animations
  useEffect(() => {
    const cards = document.querySelectorAll('.event-card.animate-on-scroll');

    // Reset classes to trigger the animation again
    cards.forEach((c) => c.classList.remove('visible'));

    const id = setTimeout(() => {
      cards.forEach((c) => c.classList.add('visible'));
    }, 50);

    return () => clearTimeout(id);
  }, [activeTab]); // Added activeTab as a dependency

  return (
    <section id='events'>
      <div className='section-inner'>
        <div className='section-tag animate-on-scroll'>Our Events</div>
        <h2 className='section-title animate-on-scroll'>
          <em>Compete.</em> Create. Conquer.
        </h2>
        <p className='section-subtitle animate-on-scroll'>Eight electrifying events across technical and non-technical domains — each designed to test your limits.</p>

        {/* Tab Switcher */}
        <div className='tabs-container animate-on-scroll'>
          <Button variant={activeTab === 'technical' ? 'primary' : 'secondary'} onClick={() => setActiveTab('technical')} size='sm'>
            Technical
          </Button>
          <Button variant={activeTab === 'non-technical' ? 'primary' : 'secondary'} onClick={() => setActiveTab('non-technical')} size='sm'>
            Non-Technical
          </Button>
        </div>

        <div className='events-grid'>
          {EVENTS.filter((ev) => ev.category.toLowerCase() === activeTab).map((ev, i) => (
            <div key={ev.id} className={`event-card animate-on-scroll delay-${(i % 5) + 1}`}>
              <div className='event-card-glow' />
              <div className='event-card-header'>
                <span className='event-card-icon'>{ev.icon}</span>
                <div className='event-card-title'>{ev.title}</div>
                <div className='event-card-tagline' dangerouslySetInnerHTML={{__html: ev.subtitle}}></div>
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
