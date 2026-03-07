import React, {useMemo, useRef} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';

export default function Particles() {
  const containerRef = useRef(null);

  const particles = useMemo(
    () =>
      Array.from({length: 22}, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2,
        delay: Math.random() * 10,
        duration: Math.random() * 15 + 10,
        color: ['#F4C430', '#FFD700', '#C9A227'][i % 3],
      })),
    [],
  );

  const stars = useMemo(
    () =>
      Array.from({length: 60}, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2 + Math.random() * 3,
      })),
    [],
  );

  useGSAP(
    () => {
      const handleMouseMove = (e) => {
        const {innerWidth, innerHeight} = window;
        const xPos = (e.clientX / innerWidth - 0.5) * 30;
        const yPos = (e.clientY / innerHeight - 0.5) * 30;

        gsap.to('.hero-particle', {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to('.star', {
          x: xPos * 0.5,
          y: yPos * 0.5,
          duration: 1,
          ease: 'power2.out',
        });
        gsap.to('.hero-ring', {
          x: -xPos * 0.3,
          y: -yPos * 0.3,
          duration: 2,
          ease: 'power2.out',
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    },
    {scope: containerRef},
  );

  return (
    <div className='hero-canvas' ref={containerRef}>
      <div className='hex-grid' />
      <div className='stars'>
        {stars.map((s) => (
          <div
            key={s.id}
            className='star'
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>
      {particles.map((p, index) => (
        <div
          key={p.id}
          className='hero-particle'
          style={{
            left: `${p.left}%`,
            top: `${(p.id * 17) % 100}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
      <div className='hero-rings'>
        {[300, 500, 700, 900].map((size, i) => (
          <div
            key={i}
            className='hero-ring'
            style={{
              width: size,
              height: size,
              animationDuration: `${20 + i * 8}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
              opacity: 0.1 + i * 0.02,
            }}
          />
        ))}
      </div>
    </div>
  );
}
