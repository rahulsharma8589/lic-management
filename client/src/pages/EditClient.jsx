import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ClientForm from '../components/ClientForm';

const EditClient = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  
  // We reuse the same state structure as AddPolicy
  const [formData, setFormData] = useState({
    fullName: '', dob: '', mobile: '', email: '', address: '',
    panNumber: '', adharNumber: '', bankAccountNo: '', ifscCode: '', bankName: ''
  });

  // 1. Fetch Existing Data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/clients/${id}`)
      .then(res => {
        // Fill the form with existing data
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [id]);

  // 2. Handle Update
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/clients/${id}`, formData);
      alert("Client updated successfully! ✅");
      navigate(`/client/${id}`); // Go back to profile
    } catch (error) {
      console.error("Error updating:", error);
      alert("Failed to update.");
    }
  };

  if (loading) return <div className="text-center p-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Edit Client</h1>
          <Link to={`/client/${id}`} className="text-gray-500 hover:text-gray-700">Cancel</Link>
        </div>

        {/* Reuse the Form Component */}
        <ClientForm data={formData} updateData={setFormData} />

        <div className="mt-8 flex justify-end gap-4">
           <Link to={`/client/${id}`} className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 font-semibold">
             Cancel
           </Link>
           <button 
             onClick={handleUpdate}
             className="px-6 py-2 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow"
           >
             Save Changes
           </button>
        </div>
      </div>
    </div>
  );
};

export default EditClient;