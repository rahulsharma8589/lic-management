import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ClientDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // For redirecting after delete
  const [client, setClient] = useState(null);
  const [policies, setPolicies] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        // 1. Fetch Client Details
        const clientRes = await axios.get(`http://localhost:5000/api/clients/${id}`);
        setClient(clientRes.data);

        // 2. Fetch Policies and Filter for this Client
        const policyRes = await axios.get('http://localhost:5000/api/policies');
        const clientPolicies = policyRes.data.filter(p => 
            (p.clientId?._id === id) || (p.clientId === id)
        );
        setPolicies(clientPolicies);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  // --- DELETE CLIENT FUNCTION ---
  const handleDelete = async () => {
    if (window.confirm("ARE YOU SURE? This will permanently delete this client and all their data.")) {
      try {
        await axios.delete(`http://localhost:5000/api/clients/${id}`);
        alert("Client deleted successfully.");
        navigate('/'); // Go back to Dashboard
      } catch (error) {
        console.error("Error deleting:", error);
        alert("Failed to delete client.");
      }
    }
  };

  if (loading) return <div className="p-10 text-center text-blue-600 font-bold">Loading Profile...</div>;
  if (!client) return <div className="p-10 text-center text-red-500">Client not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      
      {/* Top Navigation & Action Buttons */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/" className="text-blue-600 font-semibold hover:underline">← Back to Dashboard</Link>
        
        <div className="flex gap-3">
          {/* EDIT CLIENT BUTTON */}
          <Link 
            to={`/edit-client/${id}`}
            className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-yellow-200 transition flex items-center gap-2"
          >
            ✏️ Edit Details
          </Link>

          {/* DELETE CLIENT BUTTON */}
          <button 
            onClick={handleDelete}
            className="bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-bold hover:bg-red-200 transition flex items-center gap-2"
          >
            🗑️ Delete Client
          </button>
        </div>
      </div>
      
      {/* Client Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-800">{client.fullName}</h1>
            <p className="text-gray-500 text-sm">Client ID: {client._id}</p>
        </div>
        <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-bold">
          {policies.length} Active Policies
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: Personal Info & Documents */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Personal Info Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h2 className="font-bold border-b pb-2 mb-4 text-gray-700">Personal Details</h2>
             <div className="space-y-3 text-sm">
               <p><span className="text-gray-500 block">Mobile:</span> {client.mobile}</p>
               <p><span className="text-gray-500 block">Email:</span> {client.email}</p>
               <p><span className="text-gray-500 block">Address:</span> {client.address}</p>
               <p><span className="text-gray-500 block">DOB:</span> {client.dob ? new Date(client.dob).toLocaleDateString() : 'N/A'}</p>
               <p><span className="text-gray-500 block">PAN No:</span> {client.panNumber || 'N/A'}</p>
             </div>
          </div>

          {/* Documents Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
             <h2 className="font-bold border-b pb-2 mb-4 text-gray-700">Digital Locker</h2>
             <div className="grid grid-cols-2 gap-3">
               {client.documents?.photo ? (
                 <a href={client.documents.photo} target="_blank" rel="noreferrer" className="block group">
                   <img src={client.documents.photo} className="w-full h-24 object-cover rounded border group-hover:opacity-75 transition" alt="Photo" />
                   <span className="text-xs text-blue-500 mt-1 block">View Photo</span>
                 </a>
               ) : <span className="text-xs text-gray-400">No Photo</span>}

               {client.documents?.adharFront ? (
                 <a href={client.documents.adharFront} target="_blank" rel="noreferrer" className="block group">
                   <img src={client.documents.adharFront} className="w-full h-24 object-cover rounded border group-hover:opacity-75 transition" alt="Adhar" />
                   <span className="text-xs text-blue-500 mt-1 block">View Aadhar</span>
                 </a>
               ) : <span className="text-xs text-gray-400">No Aadhar</span>}
             </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Policy List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4 text-gray-700">Policy Portfolio</h2>
          
          {policies.length > 0 ? (
            <div className="space-y-4">
              {policies.map((policy) => (
                <div key={policy._id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-md transition">
                  
                  {/* Policy Info */}
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-bold text-lg text-blue-700">{policy.planName}</h3>
                    <p className="text-sm text-gray-600">Policy No: <span className="font-mono font-bold">{policy.policyNumber}</span></p>
                    
                    <div className="flex gap-4 mt-2 text-xs text-gray-500">
                        {/* Highlights red if due date exists */}
                        <span className={policy.nextDueDate ? "text-red-600 font-bold" : ""}>
                            Due: {policy.nextDueDate ? new Date(policy.nextDueDate).toLocaleDateString() : "N/A"}
                        </span>
                        <span>•</span>
                        <span>Mode: {policy.paymentMode}</span>
                        <span>•</span>
                        <span>Term: {policy.policyTerm} Yrs</span>
                    </div>
                  </div>
                  
                  {/* Premium & Edit Button */}
                  <div className="flex flex-col items-end gap-2">
                    <div className="text-right">
                        <p className="text-xs text-gray-500 uppercase tracking-wide">Premium</p>
                        <p className="text-2xl font-bold text-green-600">₹{policy.premiumAmount}</p>
                    </div>
                    
                    {/* EDIT / RENEW POLICY BUTTON */}
                    <Link 
                        to={`/edit-policy/${policy._id}`}
                        className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded border border-blue-200 hover:bg-blue-100 font-bold flex items-center gap-1"
                    >
                        ✏️ Edit / Renew
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white p-10 rounded-xl shadow-sm border border-dashed border-gray-300 text-center">
              <p className="text-gray-500 text-lg">No policies found for this client.</p>
              <Link to="/add-policy" className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 mt-4 inline-block">
                + Add New Policy
              </Link>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ClientDetails;