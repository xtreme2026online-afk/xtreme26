import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import Button from './Button';
import '../styles/navbar.css';

const NAV_ITEMS = ['events', 'staff', 'venue'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className='nav-inner'>
          <Link to='/' className='nav-logo' onClick={() => setMenuOpen(false)}>
            XTREME<span>&#x27;26</span>
          </Link>

          <ul className='nav-links'>
            {NAV_ITEMS.map((id) => (
              <li key={id}>
                <NavLink to={`/${id}`} className={({ isActive }) => (isActive ? 'active' : '')}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </NavLink>
              </li>
            ))}
            <li>
              <Button to='/register' variant='primary' size='sm'>
                Register Now
              </Button>
            </li>
          </ul>

          <button className='hamburger' onClick={() => setMenuOpen((o) => !o)} aria-label='Menu'>
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? ' open' : ''}`}>
        <Link to='/' onClick={() => setMenuOpen(false)}>
          Home
        </Link>
        {NAV_ITEMS.map((id) => (
          <Link key={id} to={`/${id}`} onClick={() => setMenuOpen(false)}>
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </Link>
        ))}
        <Button to='/register' variant='primary' className='mobile-register' onClick={() => setMenuOpen(false)}>
          Register Now
        </Button>
      </div>
    </>
  );
}
