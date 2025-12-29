import React from 'react';

const DocumentForm = ({ data, updateData }) => {

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    // Store the first file selected (since we only allow 1 per field)
    updateData({ ...data, [name]: files[0] });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
          Upload Documents (Images/PDF)
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Please ensure images are clear. Allowed formats: JPG, PNG, PDF.
        </p>
      </div>

      {/* Passport Photo */}
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">Passport Size Photo</label>
        <input 
          type="file" name="photo" accept="image/*" onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
        />
        {data.photo && <p className="text-xs text-green-600 mt-1">✓ Selected: {data.photo.name}</p>}
      </div>

      {/* Aadhar Card */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card (Front)</label>
        <input 
          type="file" name="adharFront" accept="image/*,application/pdf" onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Aadhar Card (Back)</label>
        <input 
          type="file" name="adharBack" accept="image/*,application/pdf" onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
        />
      </div>

      {/* PAN Card */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">PAN Card</label>
        <input 
          type="file" name="panCard" accept="image/*,application/pdf" onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
        />
      </div>

      {/* Bank Passbook */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Bank Passbook / Cheque</label>
        <input 
          type="file" name="bankPassbook" accept="image/*,application/pdf" onChange={handleFileChange}
          className="w-full p-2 border border-gray-300 rounded bg-gray-50 text-sm"
        />
      </div>

    </div>
  );
};

export default DocumentForm;