import React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from './Button';
import '../styles/event-intro.css';

export default function EventIntroSection() {
  const navigate = useNavigate();

  return (
    <section id='event-intro'>
      <div className='section-inner event-intro-container'>
        <div className='event-intro-content animate-on-scroll'>
          <div className='section-tag'>The Ultimate Technical Showcase</div>
          <h2 className='section-title'>
            <em>Code.</em> Build. Deploy.
          </h2>
          <p className='event-intro-desc section-subtitle'>
            Step into the arena where logic meets creativity. Engage in high-octane coding challenges, hackathons, and technical deep-dives designed to separate the best from the
            rest.
          </p>
        </div>

        <div className='event-intro-features animate-on-scroll'>
          <div className='feature-capsule delay-1'>
            <span className='feature-icon'>⚡</span>
            <span className='feature-text'>Algorithms</span>
          </div>
          <div className='feature-capsule delay-2'>
            <span className='feature-icon'>🧠</span>
            <span className='feature-text'>System Design</span>
          </div>
          <div className='feature-capsule delay-3'>
            <span className='feature-icon'>🛠️</span>
            <span className='feature-text'>Hackathons</span>
          </div>
          <div className='feature-capsule delay-4'>
            <span className='feature-icon'>🐞</span>
            <span className='feature-text'>Debugging</span>
          </div>
        </div>

        <div className='event-intro-cta animate-on-scroll delay-5'>
          <Button variant='primary' to='/events'>
            Enter the Arena
          </Button>
        </div>
      </div>

      {/* Decorative background elements */}
      <div className='tech-grid-bg'></div>
    </section>
  );
}
