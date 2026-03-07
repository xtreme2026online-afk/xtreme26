import {useState, useRef} from 'react';
import {useGSAP} from '@gsap/react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {GALLERY_DATA} from '../data/gallery';
import '../styles/gallery.css';

gsap.registerPlugin(ScrollTrigger);
const isPath = (str) => typeof str === 'string' && (str.startsWith('/') || str.startsWith('./'));

function VideoCard({video, featured}) {
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

  return (
    <div className={`video-frame${featured ? ' video-frame--featured' : ''}`}>
      <div className='video-wrapper' onClick={toggle}>
        {!errored ?
          <video ref={videoRef} src={video.src} className='video-el' preload='metadata' playsInline autoPlay muted loop onError={() => setErrored(true)} />
        : <div className='video-error'>
            <span>🎬</span>
            <p>Video unavailable</p>
          </div>
        }

        {/* overlay shown when paused */}
        {!playing && !errored && (
          <div className='video-overlay'>
            <div className='video-play'>▶</div>
          </div>
        )}

        {/* pause button shown when playing */}
        {playing && (
          <div className='video-overlay video-overlay--hover'>
            <div className='video-play video-play--pause'>⏸</div>
          </div>
        )}
      </div>

      <div className='video-meta'>
        <span className='video-title'>{video.title}</span>
        <span className='video-badge'>{playing ? 'Playing' : 'Click to play'}</span>
      </div>
    </div>
  );
}

export default function Gallery() {
  const galleryRef = useRef(null);
  const [year, setYear] = useState('2025');
  const data = GALLERY_DATA[year];

  useGSAP(
    () => {
      gsap.fromTo(
        '.section-tag, .section-title, .section-subtitle',
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: galleryRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo('.year-tabs', {opacity: 0, y: 20}, {opacity: 1, y: 0, duration: 0.8, delay: 0.4});

      gsap.fromTo(
        '.gallery-hero',
        {opacity: 0, scale: 0.95, y: 30},
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: '.gallery-hero',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        '.video-frame',
        {opacity: 0, y: 30},
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.video-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );

      gsap.fromTo(
        '.gallery-img',
        {opacity: 0, scale: 0.8},
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
          scrollTrigger: {
            trigger: '.image-strip',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        },
      );
    },
    {scope: galleryRef, dependencies: [year]},
  );

  return (
    <section id='gallery' ref={galleryRef}>
      <div className='section-inner'>
        <div className='section-tag'>Memories</div>
        <h2 className='section-title'>
          Past <em>Symposiums</em>
        </h2>
        <p className='section-subtitle'>Relive the energy, passion, and brilliance of our previous editions.</p>

        <div className='year-tabs'>
          {['2025', '2024'].map((y) => (
            <button key={y} className={`year-tab${year === y ? ' active' : ''}`} onClick={() => setYear(y)}>
              {y}
            </button>
          ))}
        </div>

        {/* Hero card */}
        <div className='gallery-hero'>
          <div className='gallery-hero-content'>
            <div className='section-tag' style={{justifyContent: 'flex-start'}}>
              {year}
            </div>
            <h3 className='gallery-theme'>{data.theme}</h3>
            <p className='gallery-tagline'>{data.tagline}</p>
          </div>
          <div className='gallery-stats-row'>
            {data.stats.map((stat) => (
              <div key={stat.label} className='gallery-stat'>
                <span className='gallery-stat-num'>{stat.value}</span>
                <span className='gallery-stat-label'>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Videos */}
        <div className='video-grid'>
          {data.videos.map((v, i) => (
            <VideoCard key={`${year}-${i}`} video={v} featured={i === 0} />
          ))}
        </div>

        {/* Image strip */}
        <div className='image-strip'>
          {data.images.map((img, i) => (
            <div key={i} className='gallery-img'>
              {isPath(img) ?
                <img
                  src={img}
                  alt={`Gallery ${year} - ${i + 1}`}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextSibling.style.display = 'flex';
                  }}
                />
              : null}
              <span className='gallery-img-emoji' style={{display: isPath(img) ? 'none' : 'flex'}}>
                {isPath(img) ? '🖼️' : img}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
