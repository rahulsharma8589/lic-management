import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import AddPolicy from './pages/AddPolicy';
import ClientDetails from './pages/ClientDetails';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-policy" element={<AddPolicy />} />
        <Route path="/client/:id" element={<ClientDetails />} />
      </Routes>
    </Router>
  );
}