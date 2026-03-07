import React, {useEffect} from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import EventIntroSection from '../components/EventIntroSection';
import '../styles/home.css';

export default function HomePage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      {threshold: 0.1},
    );
    const els = document.querySelectorAll('.animate-on-scroll, .animate-left, .animate-right');
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className='home-page-bg'>
      <Hero />
      <About />
      <EventIntroSection />
    </div>
  );
}
