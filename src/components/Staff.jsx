import React from 'react';
import {STAFF} from '../data/staff';
import '../styles/staff.css';

function StaffCard({person, isLeadership = false}) {
  return (
    <div className={`staff-card${isLeadership ? ' leadership' : ''}`}>
      <div className={`staff-avatar${isLeadership ? ' leadership' : ''}`}>
        <img src={person.profile} alt={person.name} />
      </div>
      <div className='staff-name'>{person.name}</div>
      <div className='staff-role'>{person.designation}</div>
      <div className='staff-dept'>{person.role}</div>
    </div>
  );
}

export default function Staff() {
  return (
    <section id='staff'>
      <div className='section-inner'>
        <div className='section-tag animate-on-scroll'>Our Team</div>
        <h2 className='section-title animate-on-scroll'>
          The <em>Minds</em> Behind XTREME
        </h2>
        <p className='section-subtitle animate-on-scroll'>Guided by experienced faculty and driven by passionate student leaders.</p>

        {/* Leadership */}
        <div className='staff-section-title animate-on-scroll'>Leadership</div>
        <div className='staff-grid leadership'>
          {STAFF.leadership.map((s, i) => (
            <div key={i} className={`animate-on-scroll delay-${i + 1}`}>
              <StaffCard person={s} isLeadership />
            </div>
          ))}
        </div>

        {/* Staff In-Charge */}
        <div className='staff-section-title animate-on-scroll'>Staff In-Charge</div>
        <div className='staff-grid'>
          {STAFF.incharge.map((s, i) => (
            <div key={i} className={`animate-on-scroll delay-${(i % 4) + 1}`}>
              <StaffCard person={s} />
            </div>
          ))}
        </div>

        {/* Student Coordinators */}
        <div className='staff-section-title animate-on-scroll'>Student Coordinators</div>
        <div className='staff-grid'>
          {STAFF.student_coordinators.map((s, i) => (
            <div key={i} className={`animate-on-scroll delay-${(i % 5) + 1}`}>
              <StaffCard person={s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
