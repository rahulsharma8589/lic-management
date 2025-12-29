import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ClientDetails = () => {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/clients/${id}`);
        setClient(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!client) return <div className="p-10 text-center">Client not found</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Link to="/" className="text-blue-600 mb-4 inline-block">← Back</Link>
      <h1 className="text-3xl font-bold mb-6">{client.fullName}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
           <h2 className="font-bold border-b pb-2 mb-4">Personal Details</h2>
           <p>Mobile: {client.mobile}</p>
           <p>Email: {client.email}</p>
           <p>Address: {client.address}</p>
        </div>

        <div className="bg-white p-6 rounded shadow">
           <h2 className="font-bold border-b pb-2 mb-4">Documents</h2>
           <div className="flex gap-4">
             {client.photo && <img src={client.photo} className="h-24 w-24 object-cover border" alt="Photo" />}
             {client.adharFront && <img src={client.adharFront} className="h-24 w-32 object-cover border" alt="Aadhar" />}
           </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;