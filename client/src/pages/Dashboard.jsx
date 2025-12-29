import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- Top Navigation Bar --- */}
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            🛡️ LIC Manager
          </Link>
          <div className="space-x-4">
            <Link to="/" className="hover:text-blue-200 transition">Dashboard</Link>
            <button className="hover:text-blue-200 transition">Clients</button>
            <Link 
              to="/add-policy" 
              className="bg-white text-blue-700 px-4 py-1 rounded-full font-semibold hover:bg-blue-50 transition"
            >
              + New Policy
            </Link>
          </div>
        </div>
      </nav>

      {/* --- Main Dashboard Content --- */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
            <p className="text-3xl font-bold text-gray-800 mt-2">124</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Policies Active</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">312</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-gray-500 text-sm font-medium">Upcoming Renewals</h3>
            <p className="text-3xl font-bold text-orange-500 mt-2">5</p>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back, Agent!</h2>
          <p className="text-gray-500 mb-6">You have 5 premiums due this week.</p>
          <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition shadow-md">
            View Due List
          </button>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;