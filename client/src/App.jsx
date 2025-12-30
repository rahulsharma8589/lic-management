import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard.jsx';
import AddPolicy from './pages/AddPolicy';
import ClientDetails from './pages/ClientDetails';
import AllPolicies from './pages/AllPolicy.jsx';
import EditClient from './pages/EditClient.jsx';
import EditPolicy from './pages/EditPolicy.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add-policy" element={<AddPolicy />} />
        <Route path="/client/:id" element={<ClientDetails />} />
        <Route path="/all-policies" element={<AllPolicies />} />
        <Route path="/edit-client/:id" element={<EditClient />} />
        <Route path="/edit-policy/:id" element={<EditPolicy />} />
      </Routes>
    </Router>
  );
}