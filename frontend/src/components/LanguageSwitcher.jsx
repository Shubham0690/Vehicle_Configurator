import React from 'react';
import { useTranslation } from 'react-i18next';
import { startTransition } from 'react';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const handleChangeLanguage = (event) => {
    const lng = event.target.value;
    startTransition(() => {
      i18n.changeLanguage(lng);
    });
  };

  return (
    <div>
      <label htmlFor="language-switcher" style={{fontWeight:"bold"}}>Select Language:</label>
      <select
        id="language-select"
        onChange={handleChangeLanguage}
        defaultValue={i18n.language}
        style={{marginTop:"20px",marginLeft:"10px"}}
         // Ensure the dropdown reflects the current language
      >
        <option value="en">English</option>
        <option value="mr">Marathi</option>
        <option value="hi">Hindi</option>
        <option value="es">Spanish</option>
        {/* Add more languages here as needed */}
      </select>
    </div>
  );
};

export default LanguageSwitcher;
