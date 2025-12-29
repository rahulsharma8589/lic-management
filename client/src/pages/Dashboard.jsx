import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  // Stats State
  const [stats, setStats] = useState({
    totalClients: 0,
    totalPolicies: 0,
    totalPremium: 0
  });
  
  // Recent Clients State
  const [recentClients, setRecentClients] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- FETCH REAL DATA FROM API ---
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Get All Clients
        const clientRes = await axios.get('http://localhost:5000/api/clients');
        
        // 2. Get All Policies
        const policyRes = await axios.get('http://localhost:5000/api/policies');

        // 3. Calculate Stats
        const policies = policyRes.data;
        const totalPrem = policies.reduce((acc, curr) => acc + (Number(curr.premiumAmount) || 0), 0);

        setStats({
          totalClients: clientRes.data.length,
          totalPolicies: policies.length,
          totalPremium: totalPrem
        });

        // 4. Save the last 5 clients (Reverse to show newest first)
        setRecentClients(clientRes.data.slice(-5).reverse());
        setLoading(false);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* --- Top Navigation Bar --- */}
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">
            🛡️ LIC Manager
          </Link>
          <div className="space-x-4">
            <Link to="/" className="font-semibold text-white border-b-2 border-white">Dashboard</Link>
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
        
        {/* Loading Spinner */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 flex flex-col items-center">
             <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mb-4"></div>
             <p>Loading your business data...</p>
          </div>
        ) : (
          <>
            {/* --- STATS CARDS --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalClients}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium">Active Policies</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalPolicies}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 border-l-4 border-orange-500">
                <h3 className="text-gray-500 text-sm font-medium">Total Business (Premium)</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  ₹{stats.totalPremium.toLocaleString('en-IN')}
                </p>
              </div>
            </div>

            {/* --- RECENT CLIENTS TABLE --- */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-lg font-bold text-gray-800">Recent Clients</h2>
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">Last 5 Added</span>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-gray-500 text-sm">
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Mobile</th>
                      <th className="px-6 py-3 font-medium">City/Address</th>
                      <th className="px-6 py-3 font-medium">PAN Number</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                    {recentClients.length > 0 ? (
                      recentClients.map((client) => (
                        <tr key={client._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4 font-semibold text-blue-600">{client.fullName}</td>
                          <td className="px-6 py-4">{client.mobile}</td>
                          <td className="px-6 py-4 truncate max-w-[150px]">{client.address}</td>
                          <td className="px-6 py-4 font-mono text-xs">{client.panNumber || "N/A"}</td>
                          <td className="px-6 py-4">
                             <Link 
                               to={`/client/${client._id}`} 
                               className="text-blue-500 hover:text-blue-700 font-bold text-xs"
                             >
                               View Profile →
                             </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-gray-400">
                          No clients found. Click "New Policy" to add one!
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;      