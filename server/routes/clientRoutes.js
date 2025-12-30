const express = require('express');
const router = express.Router();
const Client = require('../models/Client');
const upload = require('../middleware/uploadMiddleware');

// Define which fields expect files
const cpUpload = upload.fields([
    { name: 'photo', maxCount: 1 },
    { name: 'adharFront', maxCount: 1 },
    { name: 'adharBack', maxCount: 1 },
    { name: 'panCard', maxCount: 1 },
    { name: 'bankPassbook', maxCount: 1 }
]);

// @route   POST /api/clients
// @desc    Register new client with documents
router.post('/', cpUpload, async (req, res) => {
    try {
        const { fullName, dob, mobile, email, address, panNumber, adharNumber, bankAccountNo, ifscCode, bankName } = req.body;

        const files = req.files || {}; 
        const documents = {
            photo: files['photo'] ? files['photo'][0].path : null,
            adharFront: files['adharFront'] ? files['adharFront'][0].path : null,
            adharBack: files['adharBack'] ? files['adharBack'][0].path : null,
            panCard: files['panCard'] ? files['panCard'][0].path : null,
            bankPassbook: files['bankPassbook'] ? files['bankPassbook'][0].path : null
        };

        const newClient = new Client({
            fullName, dob, mobile, email, address,
            panNumber, adharNumber, bankAccountNo, ifscCode, bankName,
            documents
        });

        const savedClient = await newClient.save();
        res.status(201).json(savedClient);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ✅ THIS WAS MISSING: Get All Clients Route
// @route   GET /api/clients
// @desc    Get all clients for the Dashboard
router.get('/', async (req, res) => {
    try {
        // Sort by newest first (-1)
        const clients = await Client.find().sort({ createdAt: -1 });
        res.json(clients);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/clients/:id
// @desc    Get single client by ID
router.get('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });
        res.json(client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// @route   DELETE /api/clients/:id
// @desc    Delete a client and their documents
router.delete('/:id', async (req, res) => {
    try {
        const client = await Client.findById(req.params.id);
        if (!client) return res.status(404).json({ message: 'Client not found' });

        // Optional: If you want to delete their policies too (Recommended)
        // const Policy = require('../models/Policy');
        // await Policy.deleteMany({ clientId: req.params.id });

        await Client.findByIdAndDelete(req.params.id);
        res.json({ message: 'Client removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// @route   PUT /api/clients/:id
// @desc    Update client details (Text only for now)
router.put('/:id', async (req, res) => {
    try {
        // { new: true } returns the updated document so we can send it back
        const updatedClient = await Client.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );
        res.json(updatedClient);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;