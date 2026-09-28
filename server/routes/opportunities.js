const express = require('express');
const router = express.Router();
const Opportunity = require('../models/Opportunity');
const auth = require('./middleware/auth');

// Get all opportunities for logged in user
router.get('/', auth, async (req, res) => {
    try {
        // Automatically mark missed opportunities for this user
        const now = new Date();
        await Opportunity.updateMany(
            {
                user: req.user.id,
                status: 'Not Applied',
                deadline: { $lt: now }
            },
            {
                $set: { status: 'Missed' }
            }
        );

        const opportunities = await Opportunity.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(opportunities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new opportunity
router.post('/', auth, async (req, res) => {
    const opportunity = new Opportunity({
        user: req.user.id,
        companyName: req.body.companyName,
        role: req.body.role,
        status: req.body.status,
        deadline: req.body.deadline,
        link: req.body.link,
        notes: req.body.notes,
        appliedDate: req.body.appliedDate
    });

    try {
        const newOpportunity = await opportunity.save();
        res.status(201).json(newOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update an opportunity
router.patch('/:id', auth, async (req, res) => {
    try {
        const opportunity = await Opportunity.findOne({ _id: req.params.id, user: req.user.id });
        if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });

        if (req.body.companyName != null) opportunity.companyName = req.body.companyName;
        if (req.body.role != null) opportunity.role = req.body.role;
        if (req.body.status != null) opportunity.status = req.body.status;
        if (req.body.deadline != null) opportunity.deadline = req.body.deadline;
        if (req.body.link != null) opportunity.link = req.body.link;
        if (req.body.notes != null) opportunity.notes = req.body.notes;
        if (req.body.appliedDate != null) opportunity.appliedDate = req.body.appliedDate;

        const updatedOpportunity = await opportunity.save();
        res.json(updatedOpportunity);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete an opportunity
router.delete('/:id', auth, async (req, res) => {
    try {
        const opportunity = await Opportunity.findOne({ _id: req.params.id, user: req.user.id });
        if (!opportunity) return res.status(404).json({ message: 'Opportunity not found' });

        await opportunity.deleteOne();
        res.json({ message: 'Opportunity deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
