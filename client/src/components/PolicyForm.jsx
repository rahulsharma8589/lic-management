import React, { useEffect } from 'react';

const PolicyForm = ({ data, updateData }) => {

  // Auto-calculate Maturity Date
  useEffect(() => {
    if (data.commencementDate && data.policyTerm) {
      const doc = new Date(data.commencementDate);
      const term = parseInt(data.policyTerm);
      const maturity = new Date(doc.setFullYear(doc.getFullYear() + term));
      const formattedDate = maturity.toISOString().split('T')[0];
      
      updateData(prev => ({ ...prev, maturityDate: formattedDate }));
    }
  }, [data.commencementDate, data.policyTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateData({ ...data, [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div className="md:col-span-2">
        <h3 className="text-lg font-semibold text-gray-700 border-b pb-2 mb-4">
          Policy Details
        </h3>
      </div>

      {/* Policy Number & Agency Code */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
        <input 
          type="text" name="policyNumber" value={data.policyNumber || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="123456789"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Agency Code</label>
        <input 
          type="text" name="agencyCode" value={data.agencyCode || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Plan Details */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Plan Name</label>
        <input 
          type="text" name="planName" value={data.planName || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Jeevan Anand"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Table Number</label>
        <input 
          type="number" name="tableNumber" value={data.tableNumber || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="915"
        />
      </div>

      {/* Dates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">DOC (Commencement)</label>
        <input 
          type="date" name="commencementDate" value={data.commencementDate || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* --- NEW FIELD: Next Due Date --- */}
      <div>
        <label className="block text-sm font-bold text-blue-700 mb-1">Next Premium Due</label>
        <input 
          type="date" name="nextDueDate" value={data.nextDueDate || ''} onChange={handleChange}
          className="w-full p-2 border-2 border-blue-200 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-blue-50"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Term (Yrs)</label>
          <input 
            type="number" name="policyTerm" value={data.policyTerm || ''} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">PPT (Yrs)</label>
          <input 
            type="number" name="premiumPayingTerm" value={data.premiumPayingTerm || ''} onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Auto-Calculated Field */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Maturity Date (Auto)</label>
        <input 
          type="date" name="maturityDate" value={data.maturityDate || ''} readOnly
          className="w-full p-2 border border-gray-300 bg-gray-100 rounded text-gray-500 cursor-not-allowed"
        />
      </div>

      {/* Money Matters */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Sum Assured</label>
        <input 
          type="number" name="sumAssured" value={data.sumAssured || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Premium Amount</label>
        <input 
          type="number" name="premiumAmount" value={data.premiumAmount || ''} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Mode</label>
        <select 
          name="paymentMode" value={data.paymentMode || 'Yearly'} onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none bg-white"
        >
          <option value="Yearly">Yearly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Monthly">Monthly</option>
          <option value="NACH">NACH (Bank Auto)</option>
        </select>
      </div>

    </div>
  );
};

export default PolicyForm;