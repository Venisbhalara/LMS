import { Link } from 'react-router-dom'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* TOP SECTION */}
        <div className="footer-top">

          {/* BRAND */}
          <div className="footer-brand">
            <h3 className="footer-logo">EduMaster</h3>
            <p className="footer-description">
              Learn industry-ready skills with premium courses taught by experts.
            </p>

            {/* TRUST STATS */}
            <div className="footer-stats">
              <div>
                <strong>50K+</strong>
                <span>Students</span>
              </div>
              <div>
                <strong>120+</strong>
                <span>Courses</span>
              </div>
              <div>
                <strong>4.9★</strong>
                <span>Rating</span>
              </div>
            </div>
          </div>

          {/* LINKS */}
          <div className="footer-links-wrapper">

            <div className="footer-section">
              <h4>Courses</h4>
              <ul>
                <li><Link to="/courses">All Courses</Link></li>
                <li><Link to="/courses?category=web">Web Development</Link></li>
                <li><Link to="/courses?category=data">Data Science</Link></li>
                <li><Link to="/courses?category=design">UI/UX Design</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy">Privacy</Link></li>
                <li><Link to="/terms">Terms</Link></li>
                <li><Link to="/cookies">Cookies</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
              </ul>
            </div>

          </div>

          {/* NEWSLETTER */}
          <div className="footer-newsletter">
            <h4>Stay in the loop</h4>
            <p>Weekly tips, new courses & offers.</p>

            <form className="footer-newsletter-form">
              <input type="email" placeholder="Your email" required />
              <button type="submit">Subscribe</button>
            </form>
          </div>

        </div>

        {/* DIVIDER */}
        <div className="footer-divider" />
        
       {/* BOTTOM */}
<div className="footer-bottom">
  <p>© {new Date().getFullYear()} EduMaster. All rights reserved.</p>

  <div className="footer-social">
    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-3d facebook">
      <FaFacebookF />
    </a>
    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-3d twitter">
      <FaTwitter />
    </a>
    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-3d linkedin">
      <FaLinkedinIn />
    </a>
    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-3d instagram">
      <FaInstagram />
    </a>
  </div>
</div>


      </div>
    </footer>
  )
}

export default Footer
