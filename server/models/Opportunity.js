const mongoose = require('mongoose');

const opportunitySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    companyName: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Selected', 'Rejected', 'Not Applied', 'Missed'],
        default: 'Applied'
    },
    deadline: {
        type: Date
    },
    link: {
        type: String,
        trim: true
    },
    notes: {
        type: String
    },
    appliedDate: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Opportunity', opportunitySchema);
