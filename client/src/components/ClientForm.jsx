import React from 'react';

const ClientForm = ({ data, updateData }) => {
  
  // This function updates the main state whenever you type
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      {/* --- Personal Information Section --- */}
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
          Personal Information
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input 
          type="text" name="fullName" value={data.fullName || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="e.g. Rahul Sharma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
        <input 
          type="date" name="dob" value={data.dob || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
        <input 
          type="tel" name="mobile" value={data.mobile || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="98765 43210"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
        <input 
          type="email" name="email" value={data.email || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="rahul@example.com"
        />
      </div>

      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Residential Address</label>
        <textarea 
          name="address" rows="2" value={data.address || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="House No, Street, City, Pincode"
        ></textarea>
      </div>

      {/* --- KYC & Bank Details Section --- */}
      <div className="md:col-span-2 mt-4">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
          KYC & Bank Details
        </h3>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
        <input 
          type="text" name="panNumber" value={data.panNumber || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          placeholder="ABCDE1234F"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Number</label>
        <input 
          type="text" name="adharNumber" value={data.adharNumber || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="1234 5678 9012"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account No.</label>
        <input 
          type="text" name="bankAccountNo" value={data.bankAccountNo || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">IFSC Code</label>
        <input 
          type="text" name="ifscCode" value={data.ifscCode || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none uppercase"
          placeholder="SBIN0001234"
        />
      </div>
    </div>
  );
};

export default ClientForm;