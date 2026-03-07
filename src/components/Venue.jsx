import React from 'react';
import {SCHEDULE} from '../data/schedule';
import '../styles/venue.css';

const VENUE_DETAILS = [
  ['📅', 'Date', 'March 27, 2026 (Friday)'],
  ['⏰', 'Timing', '8:00 AM - 6:00 PM'],
  ['🚌', 'Nearest Bus Stop', 'Vanarapettai Bus Stand (100m)'],
  ['🚂', 'Nearest Hospital', 'Cavery Hospital (200 m)'],
];

export default function Venue() {
  return (
    <section id='venue'>
      <div className='section-inner'>
        <div className='section-tag animate-on-scroll'>Location &amp; Schedule</div>
        <h2 className='section-title animate-on-scroll'>
          Venue &amp; <em>Timeline</em>
        </h2>
        <p className='section-subtitle animate-on-scroll'>Everything you need to know about where and when events unfold.</p>

        <div className='venue-grid'>
          {/* Venue card */}
          <div className='animate-left'>
            <div className='venue-card-main'>
              <div className='venue-name'>Francis Xavier Engineering College</div>
              <p className='venue-address'>
                National Highway 7A, Kayalpattinam Road,
                <br />
                Tirunelveli - 628 002, Tamil Nadu, India
              </p>
              <div className='venue-details'>
                {VENUE_DETAILS.map(([icon, label, val]) => (
                  <div key={label} className='venue-detail-item'>
                    <span className='venue-detail-icon'>{icon}</span>
                    <div>
                      <div className='venue-detail-label'>{label}</div>
                      <div className='venue-detail-val'>{val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Schedule */}
          <div className='animate-right'>
            <div className='schedule-heading'>Event Schedule</div>
            <div className='schedule-list'>
              {SCHEDULE.map((item, i) => (
                <div key={i} className='schedule-item'>
                  <div className='schedule-time'>{item.time}</div>
                  <div>
                    <div className='schedule-event-name'>{item.name}</div>
                    <div className='schedule-event-venue'>{item.venue}</div>
                    <span className='schedule-event-tag'>{item.tag}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
