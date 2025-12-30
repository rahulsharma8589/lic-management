import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 
import ClientForm from '../components/ClientForm';
import PolicyForm from '../components/PolicyForm';
import DocumentForm from '../components/DocumentForm';

const AddPolicy = () => {
  const [step, setStep] = useState(1);
  
  // --- STATE TO STORE ALL DATA ---
  const [formData, setFormData] = useState({
    // Client Data
    fullName: '', dob: '', mobile: '', email: '', address: '',
    panNumber: '', adharNumber: '', bankAccountNo: '', ifscCode: '', bankName: '',
    // Policy Data
    policyNumber: '', agencyCode: '', planName: '', tableNumber: '',
    commencementDate: '', policyTerm: '', premiumPayingTerm: '', 
    maturityDate: '', sumAssured: '', premiumAmount: '', paymentMode: 'Yearly',
    // Files (Initially null)
    photo: null, adharFront: null, adharBack: null, panCard: null, bankPassbook: null
  });

  // --- SUBMIT FUNCTION ---
  const handleSubmit = async () => {
    try {
      if(!formData.fullName || !formData.policyNumber) {
        alert("Please fill at least Name and Policy Number!");
        return;
      }

      alert("Submitting data... please wait.");
      
      // 1. Prepare Client Data
      const clientData = new FormData();
      clientData.append('fullName', formData.fullName);
      clientData.append('dob', formData.dob);
      clientData.append('mobile', formData.mobile);
      clientData.append('email', formData.email);
      clientData.append('address', formData.address);
      clientData.append('panNumber', formData.panNumber);
      clientData.append('adharNumber', formData.adharNumber);
      clientData.append('bankAccountNo', formData.bankAccountNo);
      clientData.append('ifscCode', formData.ifscCode);
      clientData.append('bankName', formData.bankName);
      
      if (formData.photo) clientData.append('photo', formData.photo);
      if (formData.adharFront) clientData.append('adharFront', formData.adharFront);
      if (formData.adharBack) clientData.append('adharBack', formData.adharBack);
      if (formData.panCard) clientData.append('panCard', formData.panCard);
      if (formData.bankPassbook) clientData.append('bankPassbook', formData.bankPassbook);

      // 2. Create Client
      const clientRes = await axios.post('http://localhost:5000/api/clients', clientData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const newClientId = clientRes.data._id;

      // 3. Prepare Policy Data
      const policyData = {
        clientId: newClientId,
        policyNumber: formData.policyNumber,
        agencyCode: formData.agencyCode,
        planName: formData.planName,
        tableNumber: formData.tableNumber,
        commencementDate: formData.commencementDate,
        
        // ✅ THIS LINE WAS MISSING OR NOT SAVED
        nextDueDate: formData.nextDueDate, 
        
        policyTerm: formData.policyTerm,
        premiumPayingTerm: formData.premiumPayingTerm,
        maturityDate: formData.maturityDate,
        sumAssured: formData.sumAssured,
        premiumAmount: formData.premiumAmount,
        paymentMode: formData.paymentMode
      };

      // 4. Create Policy
      await axios.post('http://localhost:5000/api/policies', policyData);

      alert("Success! Policy and Client added successfully! 🎉");
      navigate('/'); 

    } catch (error) {
      console.error("Error submitting:", error);
      alert("Error: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-blue-700 text-white shadow-lg p-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">New Policy Entry</h1>
          <Link to="/" className="text-sm hover:underline">Cancel</Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto mt-8 p-6">
        {/* Progress Bar */}
        <div className="flex justify-between mb-8 relative">
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10"></div>
          {['Client Details', 'Policy Info', 'Documents'].map((label, index) => (
            <div key={index} className="flex flex-col items-center bg-gray-50 px-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold 
                ${step > index + 1 ? 'bg-green-500 text-white' : step === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                {index + 1}
              </div>
              <span className="text-sm mt-2 text-gray-600">{label}</span>
            </div>
          ))}
        </div>

        {/* --- MAIN FORM AREA --- */}
        <div className="bg-white p-8 rounded-xl shadow-md">
           <h2 className="text-2xl font-bold mb-6 text-gray-800">
             {step === 1 && "Step 1: Who is the Client?"}
             {step === 2 && "Step 2: Policy Details"}
             {step === 3 && "Step 3: Upload Documents"}
           </h2>
           
           {/* Dynamic Step Rendering */}
           <div className="mb-6 min-h-[300px]">
             {step === 1 && <ClientForm data={formData} updateData={setFormData} />}
             {step === 2 && <PolicyForm data={formData} updateData={setFormData} />}
             {step === 3 && <DocumentForm data={formData} updateData={setFormData} />}
           </div>

           {/* Buttons */}
           <div className="flex justify-between">
             <button 
               disabled={step === 1}
               onClick={() => setStep(step - 1)}
               className={`px-6 py-2 rounded-lg font-semibold ${step === 1 ? 'bg-gray-200 text-gray-400' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
             >
               Back
             </button>

             <button 
               onClick={() => step < 3 ? setStep(step + 1) : handleSubmit()}
               className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow-md"
             >
               {step === 3 ? 'Submit All' : 'Next Step →'}
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AddPolicy;