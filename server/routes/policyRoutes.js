const express = require('express');
const router = express.Router();
const Policy = require('../models/Policy');

// @route   POST /api/policies
// @route   POST /api/policies
// @desc    Add a new policy
router.post('/', async (req, res) => {
    try {
        const newPolicy = new Policy(req.body);
        const savedPolicy = await newPolicy.save();
        res.status(201).json(savedPolicy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   GET /api/policies
// @desc    Get ALL policies (Sorted Newest First)
router.get('/', async (req, res) => {
    try {
        // Added .sort({ createdAt: -1 }) so newest policies come first
        const policies = await Policy.find()
            .sort({ createdAt: -1 }) 
            .populate('clientId', 'fullName');
            
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   GET /api/policies/:clientId
router.get('/:clientId', async (req, res) => {
    try {
        const policies = await Policy.find({ clientId: req.params.clientId });
        res.json(policies);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// @route   GET /api/policies/single/:id
// @desc    Get a SINGLE policy by ID (Pre-fill the edit form)
router.get('/single/:id', async (req, res) => {
    try {
        const policy = await Policy.findById(req.params.id);
        if (!policy) return res.status(404).json({ message: 'Policy not found' });
        res.json(policy);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @route   PUT /api/policies/:id
// @desc    Update a policy (For Renewals & Edits)
router.put('/:id', async (req, res) => {
    try {
        const updatedPolicy = await Policy.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true } 
        );
        res.json(updatedPolicy);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @route   DELETE /api/policies/:id
// @desc    Delete a policy
router.delete('/:id', async (req, res) => {
    try {
        await Policy.findByIdAndDelete(req.params.id);
        res.json({ message: 'Policy removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;