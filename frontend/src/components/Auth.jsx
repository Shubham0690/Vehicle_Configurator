import React, { useState } from "react";
import "../styles/Auth.css";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

import { useTranslation } from 'react-i18next';


export default function Auth() {
  const { t } = useTranslation();
  const [type, setType] = useState("signIn");
  const handleOnClick = (text) => {
    if (text !== type) {
      setType(text);
      return;
    }
  };
  const containerClass =
    "container " + (type === "signUp" ? "right-panel-active" : "");
  return (
    <div id="login" className="Auth">
      <h2>{t('Login/Signup Form')}</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm />
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => handleOnClick("signIn")}
              >
               {t(' Sign In')}
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>{t('Hello, Friend!')}</h1>
              <p>Share your personal details and start journey with us🚗</p>
              <button
                className="ghost "
                id="signUp"
                onClick={() => handleOnClick("signUp")}
              >
               {t('Sign Up')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
