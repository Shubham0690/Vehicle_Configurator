import React from 'react';
import '../styles/Footer.css';
import LanguageSwitcher from './LanguageSwitcher'; // Import the LanguageSwitcher component

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section" style={{marginLeft:"30px"}}>
        <h3>Useful links</h3>
        <ul className="link-list">
          <li><a href="#gallery" className="link">Gallery</a></li>
          <li><a href="#login" className="link">Login</a></li>
          <li><a href="#services" className="link">Services</a></li>
          {/* <li><a href="#contact" className="link">Contact Us</a></li> */}
        </ul>
      </div>
      <div className="footer-section">
        <h3>Our Services</h3>
        <ul className="link-list">
          <li><a href="/service1" className="link">Wide Vehicle Selection</a></li>
          <li><a href="/service2" className="link">Highly Customizable</a></li>
          <li><a href="/service3" className="link">Affordable Prices</a></li>
          <li><a href="/service4" className="link"></a></li>
        </ul>
      </div>
      <div className="footer-section">
        {/* LanguageSwitcher component added here */}
        <LanguageSwitcher />
      </div>
      <div className="footer-section">
        <h4>SM VITA</h4>
        <address>
          Gulmohar Road, MHADA Colony,
          <br /> Vile Parle West, Mumbai, <br /> Maharashtra 400049
          <br />
          India<br />
          Phone: (+91)93240 95272
        </address>
      </div>
      <div className="footer-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d30158.920558583686!2d72.8399872!3d19.1135744!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9c3a5e26d7b%3A0x89a89f343cff9c29!2sSM%20VITA!5e0!3m2!1sen!2sin!4v1722710160459!5m2!1sen!2sin"
          width="100%"
          height="200"
          className="map"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </footer>
  );
};

export default Footer;
