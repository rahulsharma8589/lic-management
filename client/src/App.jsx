import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import AddPolicy from './pages/AddPolicy';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-policy" element={<AddPolicy />} />
      </Routes>
    </Router>
  );
}