const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

// Middleware to ensure user is logged in
const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

// Get chat history with a specific user/artist
router.get('/:otherId', requireAuth, async (req, res) => {
    try {
        const myId = req.session.user.id;
        const otherId = req.params.otherId;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: otherId },
                { senderId: otherId, receiverId: myId }
            ]
        }).sort({ createdAt: 1 });

        res.json({ success: true, messages });
    } catch (err) {
        console.error('Chat history fetch error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
