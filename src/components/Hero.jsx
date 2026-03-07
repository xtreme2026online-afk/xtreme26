import React, {useMemo, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import Countdown from './Countdown';
import Button from './Button';
import '../styles/hero.css';

import Particles from './Particles';
export default function Hero() {
  const navigate = useNavigate();
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({defaults: {ease: 'power3.out'}});

      tl.fromTo('.hero-badge', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.8, delay: 0.2})
        .fromTo('.hero-year', {opacity: 0, scale: 0.9, y: 40}, {opacity: 1, scale: 1, y: 0, duration: 1}, '-=0.4')
        .fromTo('.hero-title', {opacity: 0, y: 30}, {opacity: 1, y: 0, duration: 0.8}, '-=0.6')
        .fromTo('.hero-subtitle', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8}, '-=0.6')
        .fromTo('.hero-college', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8}, '-=0.6')
        .fromTo('.hero-date', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8}, '-=0.6')
        .fromTo('.hero-cta', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8}, '-=0.6');
    },
    {scope: heroRef},
  );

  return (
    <section className='hero' ref={heroRef}>
      <Particles />

      <div className='hero-content'>
        <div className='hero-badge'>
          <div className='hero-badge-dot' />
          <span className='hero-badge-text'>Department of Computer Science &amp; Engineering</span>
        </div>

        <span className='hero-year'>XTREME</span>
        <h1 className='hero-title'>2026</h1>
        <p className='hero-subtitle'>&ldquo;Where Innovation Converges&rdquo;</p>
        <p className='hero-college'>Francis Xavier Engineering College - Tirunelveli</p>

        <div className='hero-date'>
          <Countdown />
        </div>

        <div className='hero-cta'>
          <Button variant='primary' to='/register'>
            Register Now
          </Button>
          <Button variant='secondary' to='/events'>
            Explore Events
          </Button>
        </div>
      </div>
    </section>
  );
}
