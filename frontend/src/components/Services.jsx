import React from 'react';
import "../styles/Services.css";

import { useTranslation } from 'react-i18next';




const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      icon: '🚗',
      title: 'Wide Vehicle Selection',
      description: 'Choose from a wide range of vehicles to suit your needs and budget.'
    },
    {
        icon: '🛠️', 
        title: 'Highly Customizable',
        description: 'Customize your vehicle configuration experience to meet your needs. Choose from a variety of options.',
    },
    {
      icon: '💵',
      title: 'Affordable Prices',
      description: 'Affordable prices tailored for businesses, providing the perfect balance of quality and cost, ensuring you get the best value for your everyday needs.'
    }
  ];

  return (
    <div className="services-section" id='services'>
      <h2 className="services-title">{t('Our Services')}</h2>
      <div className="services-container">
        {services.map((service, index) => (
          <div className="service-box" key={index}>
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
