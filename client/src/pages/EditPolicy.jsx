import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import PolicyForm from '../components/PolicyForm'; // reusing your existing form

const EditPolicy = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // State matches your Policy Model
  const [formData, setFormData] = useState({
    policyNumber: '', agencyCode: '', planName: '', tableNumber: '',
    commencementDate: '', nextDueDate: '', 
    policyTerm: '', premiumPayingTerm: '', 
    maturityDate: '', sumAssured: '', premiumAmount: '', paymentMode: 'Yearly'
  });

  // 1. Fetch Data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/policies/single/${id}`)
      .then(res => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        alert("Could not load policy details.");
      });
  }, [id]);

  // 2. Handle Update (Renew)
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/policies/${id}`, formData);
      alert("Policy Updated! (Renewal Successful) ✅");
      navigate(-1); // Go back to Client Profile
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update.");
    }
  };

  // 3. Handle Delete
  const handleDelete = async () => {
    if(window.confirm("Are you sure? This cannot be undone.")) {
        try {
            await axios.delete(`http://localhost:5000/api/policies/${id}`);
            alert("Policy Deleted.");
            navigate(-1);
        } catch (error) { console.error(error); }
    }
  }

  if (loading) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit / Renew Policy</h1>
          <button onClick={handleDelete} className="text-red-500 font-bold text-sm hover:underline">
            🗑 Delete Policy
          </button>
        </div>

        {/* Reuse the PolicyForm Component */}
        <PolicyForm data={formData} updateData={setFormData} />

        <div className="mt-8 flex justify-end gap-4">
           <button onClick={() => navigate(-1)} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">
             Cancel
           </button>
           <button 
             onClick={handleUpdate}
             className="px-6 py-2 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700 shadow"
           >
             Save Changes (Renew)
           </button>
        </div>
      </div>
    </div>
  );
};

export default EditPolicy;