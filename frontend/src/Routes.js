// src/Routes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from './App';
// import DefaultInvoiceGenerator from './components/DefaultInvoiceGenerator';
import AlternateModifier from './components/AlternateModifier';
// import { Configurator } from './components/Configurator';
// import InvoiceGenerator from './components/InvoiceGenerator';
// import SendInvoiceViaEmail from './components/SendInvoiceViaEmail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        {/* <Route path="/configurator" element={<Configurato/r />} /> */}
        {/* <Route path="/default-invoice-generator" element={<DefaultInvoiceGenerator />} /> */}
        <Route path="/AlternateModifier" element={<AlternateModifier />} />
        {/* <Route path="/invoice-generator" element={<InvoiceGenerator />} />
        <Route path="/send-invoice-via-email" element={<SendInvoiceViaEmail />} /> */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
