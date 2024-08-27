import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import './i18n'
import './App.css';
import Auth from './components/Auth';
import { Gal_data } from './components/Gal_data';
import Services from './components/Services';
import { Navbar } from './components/Navbar';
import Main_bg from './components/Main_bg';
import Footer from './components/Footer';
import { AuthContext } from './contexts/AuthContext';
import Manufacturer from './components/Manufacturer';
import Configurations from './components/Configurations';
import AlternateModifier from './components/AlternateModifier';
import InvoiceGenerator from './components/InvoiceGenerator';



function App() {
  const { isLogged } = useContext(AuthContext);
  const username = localStorage.getItem("username") || 'Guest'; // Default to 'Guest' if not found
  console.log("Username retrieved:", username); 

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            isLogged ? (
              <>
                <div style={{display:"flex",justifyContent:"flex-end"}}>
                  <h2 style={{
                    textAlign:"right",
                    paddingRight:"30px",
                    background: 'linear-gradient(to right, #4285f4 20%, #d96570 80%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    display: 'inline'
                  }}>
                    Welcome, {username}
                  </h2>
                </div>
                <Configurations />
              </>
            ) : (
              <>
                <Main_bg id="main-bg" />
                <Auth id="login" />
                <Services id="services" />
                <Gal_data id="gallery" />
                <Manufacturer />
              </>
            )
          } />
          <Route path="/AlternateModifier" element={<AlternateModifier />} />
          <Route path="/Configurations" element={<Configurations />} />
          <Route path="/InvoiceGenerator" element={<InvoiceGenerator />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
