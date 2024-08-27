import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { Link } from 'react-scroll';
import '../styles/Navbar.css'; // Make sure to create and link your CSS file
import { useTranslation } from 'react-i18next';







export const Navbar = () => {

  const { t } = useTranslation();

  const { isLogged, logout } = useContext(AuthContext);
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo" >
        {t('Vehicle Configurator')}
      </div>
      <div className="hamburger" onClick={toggleMenu}>
        ☰ {/* Three lines icon */}
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link to="services" smooth={true} duration={500} onClick={toggleMenu}>
            {t('Services')}
          </Link>
        </li>
        <li>
          <Link to="gallery" smooth={true} duration={500} onClick={toggleMenu}>
            {t('Gallery')}
          </Link>
        </li>
        {isLogged ? (
          <li><a onClick={logout} style={{ cursor: "pointer" }}>Logout</a></li>
        ) : (
          <li>
            <Link to="login" smooth={true} duration={500} onClick={toggleMenu}>
              {t('Login')}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
