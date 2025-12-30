const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    dob: { type: Date, required: true },
    mobile: { type: String, required: true },
    email: { type: String },
    address: { type: String },
    
    // KYC Text Details
    panNumber: { type: String, uppercase: true },
    adharNumber: { type: String },
    bankAccountNo: { type: String },
    ifscCode: { type: String },
    bankName: { type: String },

    // The Digital Locker (File Paths)
    documents: {
        photo: { type: String },      
        adharFront: { type: String }, 
        adharBack: { type: String },  
        panCard: { type: String },    
        bankPassbook: { type: String }
    },
}, { timestamps: true });

module.exports = mongoose.model('Client', ClientSchema);