const mongoose = require('mongoose');

const WorkshopSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    startDate: { type: String, required: true }, // e.g. "Starting May 15" or "Aug 12-15, 2026"
    duration: { type: String, required: true }, // e.g. "4 Weeks" or "2 Days"
    seatsAvailable: { type: String, required: true }, // e.g. "12 Seats Left" or "Sold Out"
    location: { type: String, required: true }, // e.g. "Jaipur" or "Online"
    imageUrl: { type: String, required: true },
    status: { type: String, enum: ['Active', 'Completed'], default: 'Active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Workshop', WorkshopSchema);
