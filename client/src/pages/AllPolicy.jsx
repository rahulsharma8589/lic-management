import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllPolicies = () => {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/policies')
      .then(res => setPolicies(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Policies ({policies.length})</h1>
        <Link to="/" className="text-blue-600 hover:underline">Back to Dashboard</Link>
      </div>
      <div className="bg-white shadow rounded overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4">Policy No</th>
              <th className="p-4">Client Name</th>
              <th className="p-4">Plan</th>
              <th className="p-4">Premium</th>
            </tr>
          </thead>
          <tbody>
            {policies.map(p => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="p-4 font-mono">{p.policyNumber}</td>
                <td className="p-4 font-semibold text-blue-600">
                  <Link to={`/client/${p.clientId?._id || p.clientId}`}>
                    {p.clientId?.fullName || "View Client"}
                  </Link>
                </td>
                <td className="p-4">{p.planName}</td>
                <td className="p-4 font-bold text-green-600">₹{p.premiumAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllPolicies;