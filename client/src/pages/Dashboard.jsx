import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalClients: 0, totalPolicies: 0, totalPremium: 0 });
  const [allClients, setAllClients] = useState([]);
  const [allPolicies, setAllPolicies] = useState([]);
  
  const [filteredClients, setFilteredClients] = useState([]);
  const [filteredPolicies, setFilteredPolicies] = useState([]);
  const [upcomingDues, setUpcomingDues] = useState([]); 
  const [searchTerm, setSearchTerm] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientRes = await axios.get('http://localhost:5000/api/clients');
        const policyRes = await axios.get('http://localhost:5000/api/policies');

        const clients = clientRes.data;
        const policies = policyRes.data;

        // 1. Calculate Stats
        const totalPrem = policies.reduce((acc, curr) => acc + (Number(curr.premiumAmount) || 0), 0);
        setStats({
          totalClients: clients.length,
          totalPolicies: policies.length,
          totalPremium: totalPrem
        });

        // 2. Store Data
        setAllClients(clients);
        setAllPolicies(policies);

        // 3. Initial Display (Top 5)
        setFilteredClients(clients.slice(0, 5));
        setFilteredPolicies(policies.slice(0, 5));

        // 4. Calculate Upcoming Dues (Clean Logic)
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);

        const dues = policies.filter(p => {
            if (!p.nextDueDate) return false;
            const due = new Date(p.nextDueDate);
            due.setHours(0,0,0,0);
            return due >= today && due <= next30Days;
        });

        setUpcomingDues(dues);
        setLoading(false);

      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Could not load data. Check Server.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Search Logic ---
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredClients(allClients.slice(0, 5));
      setFilteredPolicies(allPolicies.slice(0, 5));
    } else {
      const lowerTerm = searchTerm.toLowerCase();

      const foundClients = allClients.filter(client => 
        client.fullName.toLowerCase().includes(lowerTerm) || 
        client.mobile.includes(lowerTerm)
      );
      setFilteredClients(foundClients);

      const foundPolicies = allPolicies.filter(policy => 
        policy.planName.toLowerCase().includes(lowerTerm) ||
        policy.policyNumber.includes(lowerTerm) ||
        (policy.clientId?.fullName && policy.clientId.fullName.toLowerCase().includes(lowerTerm))
      );
      setFilteredPolicies(foundPolicies);
    }
  }, [searchTerm, allClients, allPolicies]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <nav className="bg-blue-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2">🛡️ LIC Manager</Link>
          <div className="space-x-4">
             <Link to="/add-policy" className="bg-white text-blue-700 px-4 py-1 rounded-full font-semibold hover:bg-blue-50 transition">+ New Policy</Link>
          </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading Dashboard...</div>
        ) : error ? (
          <div className="text-center py-20 text-red-500 font-bold">{error}</div>
        ) : (
          <>
            {/* 🚨 Upcoming Dues Alert */}
            {upcomingDues.length > 0 && (
              <div className="mb-8 bg-red-50 border-l-4 border-red-500 p-6 rounded-r-xl shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold text-red-700 flex items-center gap-2">
                    ⚠️ Upcoming Dues (Next 30 Days)
                  </h2>
                  <span className="bg-red-200 text-red-800 px-3 py-1 rounded-full text-xs font-bold">
                    {upcomingDues.length} Policies
                  </span>
                </div>
                
                <div className="overflow-x-auto bg-white rounded border border-red-100">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-red-50 text-red-700 font-semibold border-b border-red-100">
                      <tr>
                        <th className="p-3">Client Name</th>
                        <th className="p-3">Mobile</th>
                        <th className="p-3">Due Date</th>
                        <th className="p-3 text-right">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {upcomingDues.map(p => (
                        <tr key={p._id} className="border-b last:border-0 hover:bg-red-50 transition">
                          <td className="p-3 font-medium">
                            <Link to={`/client/${p.clientId?._id || p.clientId}`} className="hover:underline">
                                {p.clientId?.fullName || "Unknown"}
                            </Link>
                          </td>
                          <td className="p-3">{p.clientId?.mobile || "-"}</td>
                          <td className="p-3 font-bold text-red-600">
                            {new Date(p.nextDueDate).toLocaleDateString()}
                          </td>
                          <td className="p-3 text-right font-bold">₹{p.premiumAmount}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500">
                <h3 className="text-gray-500 text-sm font-medium">Total Clients</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalClients}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500">
                <h3 className="text-gray-500 text-sm font-medium">Active Policies</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">{stats.totalPolicies}</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-orange-500">
                <h3 className="text-gray-500 text-sm font-medium">Total Premium</h3>
                <p className="text-3xl font-bold text-gray-800 mt-2">₹{stats.totalPremium.toLocaleString('en-IN')}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="mb-8">
              <input 
                type="text" 
                placeholder="🔍 Search by Name, Mobile, or Policy Number..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-4 rounded-xl border border-gray-200 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none text-lg"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Clients Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-700">
                    {searchTerm ? `Found ${filteredClients.length} Clients` : "Recent Clients"}
                  </h2>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {filteredClients.length > 0 ? filteredClients.map((client) => (
                        <tr key={client._id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 font-medium text-blue-600">
                            {client.fullName}
                            <div className="text-xs text-gray-400 font-normal">{client.mobile}</div>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <Link to={`/client/${client._id}`} className="text-blue-500 text-xs font-bold border border-blue-200 px-2 py-1 rounded hover:bg-blue-50">
                              View →
                            </Link>
                          </td>
                        </tr>
                      )) : (
                        <tr><td className="p-6 text-center text-gray-400">No clients match.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Policies Table */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                  <h2 className="text-lg font-bold text-gray-700">
                     {searchTerm ? `Found ${filteredPolicies.length} Policies` : "Recent Policies"}
                  </h2>
                </div>
                <div className="max-h-[400px] overflow-y-auto">
                  <table className="w-full text-left">
                    <tbody className="divide-y divide-gray-100 text-sm">
                      {filteredPolicies.length > 0 ? filteredPolicies.map((policy) => (
                        <tr key={policy._id} className="hover:bg-gray-50">
                          <td className="px-6 py-3">
                            <span className="font-bold text-gray-700 block">{policy.planName}</span>
                            <span className="text-xs text-gray-400">
                              Client: {policy.clientId?.fullName || "Unknown"}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-right">
                            <span className="block font-bold text-green-600">₹{policy.premiumAmount}</span>
                            <span className="text-xs text-gray-400">{policy.policyNumber}</span>
                          </td>
                        </tr>
                      )) : (
                        <tr><td className="p-6 text-center text-gray-400">No policies match.</td></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Dashboard;