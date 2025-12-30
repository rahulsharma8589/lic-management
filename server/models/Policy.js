const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
    clientId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Client', 
        required: true 
    }, 
    policyNumber: { type: String, required: true, unique: true },
    agencyCode: { type: String },
    planName: { type: String },
    tableNumber: { type: Number },
    commencementDate: { type: String, required: true }, // Changed to String for consistency
    
    // ✅ Defined ONLY ONCE now
    nextDueDate: { type: String }, 

    policyTerm: { type: Number },
    premiumPayingTerm: { type: Number },
    maturityDate: { type: String },
    sumAssured: { type: Number },
    premiumAmount: { type: Number },
    paymentMode: { 
        type: String, 
        enum: ['Yearly', 'Half-Yearly', 'Quarterly', 'Monthly', 'NACH'] 
    },
    policyStatus: {
        type: String,
        default: 'In-Force'
    }
}, { timestamps: true });

module.exports = mongoose.model('Policy', PolicySchema);