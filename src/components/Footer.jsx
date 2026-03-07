import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import '../styles/footer.css'

const LINKS = ['about', 'events', 'gallery', 'staff', 'venue']

export default function Footer() {
  const navigate = useNavigate()
  const location = useLocation()

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 150)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer>
      <div className="footer-inner">
        <div>
          <div className="footer-logo" onClick={() => navigate('/')}>XTREME &#x27;26</div>
          <p className="footer-desc">
            The annual national-level technical symposium of the Department of Computer Science &amp;
            Engineering, Francis Xavier Engineering College &amp; Technology, Tirunelveli.
          </p>
          <div className="footer-socials">
            {['📧', '📱', '🌐'].map((icon, i) => (
              <button key={i} className="footer-social-btn" aria-label="social">{icon}</button>
            ))}
          </div>
        </div>

        <div>
          <div className="footer-heading">Quick Links</div>
          <ul className="footer-links">
            {LINKS.map((id) => (
              <li key={id}>
                <a onClick={() => scrollTo(id)}>
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="footer-heading">Contact</div>
          <ul className="footer-links">
            <li><a href="mailto:xtreme2026@skcet.ac.in">xtreme2026.online@gmail.com</a></li>
            <li><a href="tel:+919876543210">+91 93422 77559 (Coordinator)</a></li>
            <li><a href="tel:+919876543211">+91 98765 43211 (Events)</a></li>
            <li><Link to="/register">Register Now →</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div>
          © 2026 <span>XTREME</span> · Department of CSE ·
          Francis Xavier Engineering College &amp; Technology
        </div>
        <div>Designed with <span>♥</span> by CSE Web Team</div>
      </div>
    </footer>
  )
}
