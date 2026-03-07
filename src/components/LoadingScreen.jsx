import React, {useEffect, useRef, useState} from 'react';
import '../styles/loading.css';

const STATUSES = ['Initializing...', 'Loading...', 'Almost Ready...', 'Welcome!!!'];

const QR_PATTERN = [
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 0],
  [1, 0, 1, 1, 1, 0, 1, 0, 0, 1],
  [1, 0, 1, 1, 1, 0, 1, 0, 1, 1],
  [1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 0, 1, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1, 0],
  [0, 1, 0, 0, 1, 0, 0, 1, 0, 1],
];

export default function LoadingScreen({onDone}) {
  const [progress, setProgress] = useState(0);
  const [statusIdx, setStatusIdx] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [flash, setFlash] = useState(false);
  const particlesRef = useRef(null);
  const startRef = useRef(null);
  const rafRef = useRef(null);
  const DURATION = 5000;

  // Particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const colors = ['#F4C430', '#FFD700', '#C9A227', '#FFF3C4'];
    for (let i = 0; i < 25; i++) {
      const el = document.createElement('div');
      el.className = 'loader-particle';
      const size = Math.random() * 5 + 2;
      el.style.cssText = [
        `left:${Math.random() * 100}%`,
        `width:${size}px`,
        `height:${size}px`,
        `background:${colors[Math.floor(Math.random() * 4)]}`,
        `box-shadow:0 0 ${size * 3}px #F4C430`,
        `animation-delay:${Math.random() * 8}s`,
        `animation-duration:${Math.random() * 10 + 8}s`,
      ].join(';');
      container.appendChild(el);
    }
  }, []);

  // Progress animation
  useEffect(() => {
    document.body.classList.add('loading-active');

    const ease = (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

    const step = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const raw = Math.min((ts - startRef.current) / DURATION, 1);
      const e = ease(raw);
      const prog = Math.floor(e * 100);
      setProgress(prog);
      setStatusIdx(Math.min(Math.floor(e * STATUSES.length), STATUSES.length - 1));
      if (raw < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setStatusIdx(STATUSES.length - 1);
        setFlash(true);
        setTimeout(() => {
          setHidden(true);
          document.body.classList.remove('loading-active');
          setTimeout(onDone, 100);
        }, 700);
      }
    };

    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(step);
    }, 200);
    return () => {
      clearTimeout(timer);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.body.classList.remove('loading-active');
    };
  }, [onDone]);

  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`}>
      <div className='loader-bg' />
      <div className='loader-grid' />
      <div className='loader-particles' ref={particlesRef} />
      <div className={`loader-flash${flash ? ' flash' : ''}`} />

      {/* Rings */}
      <div className='loader-rings-wrap'>
        {[
          {size: 220, dur: '12s', dir: 'normal', op: 1},
          {size: 320, dur: '20s', dir: 'reverse', op: 0.5},
          {size: 440, dur: '30s', dir: 'normal', op: 0.3},
        ].map((r, i) => (
          <div
            key={i}
            className='loader-ring'
            style={{
              width: r.size,
              height: r.size,
              animationDuration: r.dur,
              animationDirection: r.dir,
              opacity: r.op,
            }}
          />
        ))}
      </div>

      <div className='loader-content'>
        {/* Emblem */}
        <div className='loader-emblem'>
          <span className='loader-xtreme-text'>XTREME</span>
          <span className='loader-year-text'>2 0 2 6</span>
        </div>

        {/* Titles */}
        <div className='loader-title-wrap'>
          <span className='loader-main-title'>XTREME &#x27;26</span>
          <span className='loader-sub-title'>&ldquo;Where Innovation Converges&rdquo;</span>
        </div>

        {/* Progress */}
        <div className='loader-progress-wrap'>
          <div className='loader-progress-meta'>
            <div>
              <div className='loader-percent'>{progress}%</div>
              <div className='loader-dots-row'>
                <div className='loader-dot' />
                <div className='loader-dot' />
                <div className='loader-dot' />
              </div>
            </div>
            <div className='loader-status'>{STATUSES[statusIdx]}</div>
          </div>
          <div className='loader-bar-bg'>
            <div className='loader-bar-fill' style={{width: `${progress}%`}}>
              <div className='loader-bar-glow' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
