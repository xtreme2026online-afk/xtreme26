import React, {useRef, useState} from 'react';
import '../styles/about.css';

/* ── change this path to your actual college promo video ── */
const COLLEGE_VIDEO = 'https://res.cloudinary.com/dndkviye8/video/upload/v1773046858/fx-promo_xfcuoi.webm';

const FEATURES = [
  ['🎓', 'NBA & NAAC Accredited Institution'],
  ['💡', 'State-of-the-art Computing Labs'],
  ['🌐', 'Strong Industry-Academia Collaborations'],
  ['🏆', 'Ranked Top 50 Engineering Colleges in TN'],
];

const STATS = [
  ['25+', 'Years'],
  ['12K+', 'Alumni'],
  ['NBA', 'Accred.'],
  ['A+', 'Grade'],
];

function AboutVideo({src}) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [errored, setErrored] = useState(false);

  const toggle = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play()
        .then(() => setPlaying(true))
        .catch(() => setErrored(true));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  if (errored) {
    return (
      <div className='about-video-error'>
        <span>🎬</span>
        <p>Video unavailable</p>
        <small>
          Place your video at <code>public/videos/college-promo.mp4</code>
        </small>
      </div>
    );
  }

  return (
    <div className='about-video-wrap' onClick={toggle}>
      <video ref={videoRef} src={src} className='about-video-el' preload='metadata' playsInline loop onError={() => setErrored(true)} autoPlay muted />
      {/* Overlay — hidden while playing, visible on hover or when paused */}
      <div className={`about-video-overlay${playing ? ' about-video-overlay--playing' : ''}`}>
        <div className={`about-video-btn${playing ? ' about-video-btn--pause' : ''}`}>{playing ? '⏸' : '▶'}</div>
        <div className='about-video-label'>{playing ? 'Tap to pause' : 'Francis Xavier Engineering College'}</div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id='about'>
      <div className='section-inner'>
        <div className='about-grid'>
          {/* Video side */}
          <div className='about-img-wrap animate-left'>
            <div className='about-img-main'>
              <AboutVideo src={COLLEGE_VIDEO} />
              <div className='about-img-frame' />
              <div className='about-img-corner tl' />
              <div className='about-img-corner tr' />
              <div className='about-img-corner bl' />
              <div className='about-img-corner br' />
            </div>
            <div className='about-stats'>
              {STATS.map(([num, label]) => (
                <div key={label} className='about-stat'>
                  <span className='about-stat-num'>{num}</span>
                  <span className='about-stat-label'>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content side */}
          <div className='about-content animate-right'>
            <div className='section-tag'>About Our College</div>
            <h2 className='about-heading'>
              Excellence in <em>Engineering</em> &amp;
              <br />
              Technology Education
            </h2>
            <p className='about-body'>
              Francis Xavier Engineering College &amp; Technology, established in 2000, stands as one of Tamil Nadu&apos;s premier engineering institutions. Affiliated to Anna
              University and approved by AICTE, we foster a culture of innovation, research, and academic excellence.
            </p>
            <p className='about-body'>
              The Department of Computer Science &amp; Engineering, established in 2000, has consistently produced industry-ready engineers who lead in global technology. Our
              curriculum blends theory with practical application, preparing students for the challenges of tomorrow.
            </p>
            <div className='about-features'>
              {FEATURES.map(([icon, text]) => (
                <div key={text} className='about-feature'>
                  <span className='about-feature-icon'>{icon}</span>
                  <span className='about-feature-text'>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
