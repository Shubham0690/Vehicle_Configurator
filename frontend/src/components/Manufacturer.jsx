import React from 'react';
import '../styles/Manufacturer.css';
import { useTranslation } from 'react-i18next';








const Manufacturer = () => {

  const { t } = useTranslation();

  const manufacturers = [
    { name: "Manufacturer 1", logo: "/manufact/m1.png" },
    { name: "Manufacturer 2", logo: "/manufact/m2.png" },
    { name: "Manufacturer 3", logo: "/manufact/m3.png" },
    { name: "Manufacturer 4", logo: "/manufact/m4.png" },
    { name: "Manufacturer 5", logo: "/manufact/m5.png" },
    { name: "Manufacturer 6", logo: "/manufact/m6.png" },
    { name: "Manufacturer 7", logo: "/manufact/m7.png" },
    { name: "Manufacturer 8", logo: "/manufact/m8.png" },
    { name: "Manufacturer 9", logo: "/manufact/m9.png" },
    { name: "Manufacturer 10", logo: "/manufact/m10.png" }
  ];

  return (
    <div className="manufacturer-section">
      <h4 className="section-title">{t('Our Valued Partners')}</h4>
      <div className="manufacturer-scroll">
        <div className="scroll-container">
          {manufacturers.map((manufacturer, index) => (
            <div className="manufacturer-logo" key={index}>
              <img src={manufacturer.logo} alt={manufacturer.name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Manufacturer;
