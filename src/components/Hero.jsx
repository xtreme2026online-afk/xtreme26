import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Countdown from './Countdown';
import Button from './Button';
import Particles from './Particles';
import '../styles/hero.css';

const XTREME_LETTERS = ['X', 'T', 'R', 'E', 'M', 'E'];
const YEAR_DIGITS = ['2', '0', '2', '6'];

export default function Hero() {
  const heroRef = useRef(null);

  useGSAP(
    () => {
      const playAnimation = () => {
        const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

        // ── Department badge drops in ──────────────────────────────
        tl.fromTo(
          '.hero-badge',
          { opacity: 0, y: -30, scale: 0.85 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.1 },
        );

        // ── XTREME: each letter slams in from above with blur ─────
        tl.fromTo(
          '.hero-letter',
          {
            opacity: 0,
            y: -80,
            rotationX: 90,
            scale: 1.4,
            filter: 'blur(12px)',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.75,
            stagger: { each: 0.09, ease: 'power2.out' },
          },
          '-=0.4',
        );

        // ── 2026: digits flip up from below ───────────────────────
        tl.fromTo(
          '.hero-digit',
          {
            opacity: 0,
            y: 60,
            rotationX: -90,
            scale: 0.6,
            filter: 'blur(8px)',
          },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            scale: 1,
            filter: 'blur(0px)',
            duration: 0.65,
            stagger: { each: 0.1, ease: 'back.out(1.5)' },
          },
          '-=0.5',
        );

        // ── Dept / college line ────────────────────────────────────
        tl.fromTo(
          '.hero-dept-row',
          { opacity: 0, y: 18, letterSpacing: '0.6em' },
          { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.9 },
          '-=0.4',
        );

        // ── Subtitle typewriter-ish reveal ────────────────────────
        tl.fromTo(
          '.hero-subtitle',
          { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
          { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.1, ease: 'power2.inOut' },
          '-=0.5',
        );

        // ── College name ──────────────────────────────────────────
        tl.fromTo(
          '.hero-college',
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          '-=0.6',
        );

        // ── Scan line wipe across the whole title block ───────────
        tl.fromTo(
          '.hero-scanline',
          { scaleX: 0, opacity: 1 },
          { scaleX: 1, opacity: 0, duration: 1.1, ease: 'power2.inOut', transformOrigin: 'left' },
          0.6,
        );

        // ── Divider ───────────────────────────────────────────────
        tl.fromTo(
          '.hero-divider',
          { scaleX: 0, opacity: 0 },
          { scaleX: 1, opacity: 1, duration: 0.6, transformOrigin: 'center', ease: 'power2.out' },
          '-=0.6',
        );

        // ── Countdown + CTA ───────────────────────────────────────
        tl.fromTo(
          '.hero-date',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.4',
        );
        tl.fromTo(
          '.hero-cta',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          '-=0.55',
        );

        // ── Continuous letter glow pulse loop ─────────────────────
        tl.eventCallback('onComplete', () => {
          gsap.to('.hero-letter', {
            textShadow: '0 0 40px rgba(255,215,0,0.9), 0 0 80px rgba(244,196,48,0.5)',
            duration: 1.8,
            stagger: { each: 0.18, repeat: -1, yoyo: true },
            ease: 'sine.inOut',
          });
        });
      };

      // Ensure the hero only animates when the main app wrapper becomes visible
      const appWrapper = document.querySelector('.app-wrapper');
      if (appWrapper && appWrapper.classList.contains('app-visible')) {
        playAnimation();
      } else if (appWrapper) {
        const observer = new MutationObserver((mutations) => {
          mutations.forEach((mutation) => {
            if (mutation.attributeName === 'class' && appWrapper.classList.contains('app-visible')) {
              observer.disconnect();
              playAnimation();
            }
          });
        });
        observer.observe(appWrapper, { attributes: true });
        return () => observer.disconnect();
      } else {
        // Fallback
        playAnimation();
      }
    },
    { scope: heroRef },
  );

  return (
    <section className='hero' ref={heroRef}>
      <Particles />

      {/* Scan line overlay — animated via GSAP */}
      <div className='hero-scanline' aria-hidden='true' />

      <div className='hero-content'>

        {/* ── Department badge ─────────────────────── */}
        <div className='hero-badge'>
          <div className='hero-badge-dot' />
          <span className='hero-badge-text'>
            Department of Computer Science &amp; Engineering
          </span>
          <div className='hero-badge-dot' />
        </div>

        {/* ── XTREME — letter by letter ────────────── */}
        <div className='hero-year' aria-label='XTREME'>
          {XTREME_LETTERS.map((ch, i) => (
            <span key={i} className='hero-letter' style={{ '--i': i }}>
              {ch}
            </span>
          ))}
        </div>

        {/* ── 2026 — digit by digit ────────────────── */}
        <h1 className='hero-title' aria-label='2026'>
          {YEAR_DIGITS.map((d, i) => (
            <span key={i} className='hero-digit' style={{ '--i': i }}>
              {d}
            </span>
          ))}
        </h1>

        {/* Decorative divider */}
        <div className='hero-divider' aria-hidden='true' />

        {/* ── Subtitle ─────────────────────────────── */}
        <p className='hero-subtitle'>
          &ldquo;Where Innovation Converges&rdquo;
        </p>

        {/* ── Department / college block ────────────── */}
        <div className='hero-dept-row'>
          <span className='hero-dept-tag'>◆</span>
          <p className='hero-college'>
            Francis Xavier Engineering College &amp; Technology · Tirunelveli
          </p>
          <span className='hero-dept-tag'>◆</span>
        </div>

        {/* ── Countdown ────────────────────────────── */}
        <div className='hero-date'>
          <Countdown />
        </div>

        {/* ── CTAs ─────────────────────────────────── */}
        <div className='hero-cta'>
          <Button variant='primary' to='/register'>Register Now</Button>
          <Button variant='secondary' to='/events'>Explore Events</Button>
        </div>

      </div>
    </section>
  );
}
