import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(sessionStorage.getItem('isLoggedIn') === 'true');
  
  const navigate = useNavigate();
  const login = (username) => {
    setIsLogged(true);
    sessionStorage.setItem('isLoggedIn', 'true');
    sessionStorage.setItem('username', username);
  };

  const logout = () => {
    setIsLogged(false);
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('username');
    navigate('/');
  };

  useEffect(() => {
    setIsLogged(sessionStorage.getItem('isLoggedIn') === 'true');
  }, []);

  return (
    <AuthContext.Provider value={{ isLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
