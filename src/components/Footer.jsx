import React from 'react';
import {Link, useNavigate, useLocation} from 'react-router-dom';
import '../styles/footer.css';

const LINKS = ['events', 'staff', 'venue'];

const ArrowRightIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <line x1='5' y1='12' x2='19' y2='12'></line>
    <polyline points='12 5 19 12 12 19'></polyline>
  </svg>
);

const MailIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'></path>
    <polyline points='22,6 12,13 2,6'></polyline>
  </svg>
);

const PhoneIcon = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z'></path>
  </svg>
);

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
      }, 150);
    } else {
      document.getElementById(id)?.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <footer>
      <div className='footer-glow'></div>
      <div className='footer-accents'></div>
      <div className='footer-inner'>
        <div className='footer-brand'>
          <div className='footer-logo' onClick={() => navigate('/')}>
            XTREME <span>&#x27;26</span>
          </div>
          <p className='footer-desc'>
            The annual national-level technical symposium of the Department of Computer Science &amp; Engineering, Francis Xavier Engineering College, Tirunelveli. Experience the
            convergence of technology and innovation.
          </p>
        </div>

        <div>
          <div className='footer-heading'>Explore</div>
          <ul className='footer-links'>
            {LINKS.map((id) => (
              <li key={id}>
                <a onClick={() => scrollTo(id)}>
                  <ArrowRightIcon />
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <Link to='/register'>
                <ArrowRightIcon />
                Register Now
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <div className='footer-heading'>Connect</div>
          <ul className='footer-links'>
            <li>
              <a href='mailto:xtreme2026.online@gmail.com'>
                <MailIcon />
                xtreme2026.online@gmail.com
              </a>
            </li>
            <li>
              <a href='tel:+919342277559'>
                <PhoneIcon />
                +91 93422 77559 (Coordinator)
              </a>
            </li>
            <li>
              <a href='tel:+919789569527'>
                <PhoneIcon />
                +91 97895 69527 (Events)
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className='footer-bottom'>
        <div>
          © 2026 <span className='highlight'>XTREME</span> · Dept. of CSE · Francis Xavier Engineering College
        </div>
        <div>
          Designed with <span className='heart'>♥</span> by CSE Web Team
        </div>
      </div>
    </footer>
  );
}
