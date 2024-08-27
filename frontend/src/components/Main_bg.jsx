import React from 'react';
import { useTranslation } from 'react-i18next';

const Main_bg = () => {
  const { t } = useTranslation(); // Destructure both t and i18n

  const containerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px',
    height: '500px',
    backgroundColor: '#f0f0f0',
  };

  const textStyle = {
    color: '#333',
    textAlign: 'left',
    maxWidth: '600px',
  };

  const titleStyle = {
    fontSize: '2.5em',
    margin: '0',
    background: 'linear-gradient(to bottom right, lightblue, dodgerblue, blue)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const subtitleStyle = {
    fontSize: '1.5em',
    marginTop: '10px',
  };

  const imageStyle = {
    width: '65%',
    height: 'auto',
    maxHeight: '800px',
    objectFit: 'contain',
  };

  return (
    <div style={containerStyle}>
      <div style={textStyle}>
        <h1 style={titleStyle}>{t('Vehicle Configurator')}</h1>
        <p style={subtitleStyle}>{t('Drive Your Success, Fueled by Our Expertise, Business Soars 🚀')}</p>
      </div>
      <img src="/images/fleet2.png" alt="Vehicle Fleet" style={imageStyle} />
    </div>
  );
};

export default Main_bg;
