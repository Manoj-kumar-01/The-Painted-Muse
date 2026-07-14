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

const Artist = require('../models/Artist');
const User = require('../models/User');

// Get all active conversations for the logged in user
router.get('/inbox', requireAuth, async (req, res) => {
    try {
        const myId = req.session.user.id;
        
        // Find all messages involving this user
        const messages = await Message.find({
            $or: [{ senderId: myId }, { receiverId: myId }]
        }).sort({ createdAt: -1 });

        // Group by conversation partner
        const convosMap = new Map();
        
        for (let msg of messages) {
            const isMeSender = msg.senderId.toString() === myId;
            const otherId = isMeSender ? msg.receiverId.toString() : msg.senderId.toString();
            const otherModel = isMeSender ? msg.receiverModel : msg.senderModel;
            
            if (!convosMap.has(otherId)) {
                convosMap.set(otherId, {
                    otherId,
                    otherModel,
                    lastMessage: msg.content,
                    lastMessageTime: msg.createdAt,
                    unreadCount: 0
                });
            }
            
            // If I am the receiver and message is unread, increment count
            if (!isMeSender && !msg.isRead) {
                convosMap.get(otherId).unreadCount++;
            }
        }

        const convos = Array.from(convosMap.values());
        
        // Populate partner details
        for (let convo of convos) {
            let partner;
            if (convo.otherModel === 'Artist') {
                partner = await Artist.findById(convo.otherId).select('fullName profilePic specialization');
            } else {
                partner = await User.findById(convo.otherId).select('fullName profilePic');
            }
            
            if (partner) {
                convo.partnerName = partner.fullName;
                convo.partnerPic = partner.profilePic || (convo.otherModel === 'Artist' ? 'pics/user_profile.png' : 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + partner.fullName);
                convo.partnerSubtitle = convo.otherModel === 'Artist' ? (partner.specialization || 'Artist') : 'Collector';
            } else {
                convo.partnerName = 'Unknown User';
                convo.partnerPic = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Unknown';
                convo.partnerSubtitle = '';
            }
        }

        res.json({ success: true, conversations: convos });
    } catch (err) {
        console.error('Fetch inbox error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get total unread count for the logged in user
router.get('/unread-count', requireAuth, async (req, res) => {
    try {
        const myId = req.session.user.id;
        const count = await Message.countDocuments({
            receiverId: myId,
            isRead: false
        });
        res.json({ success: true, count });
    } catch (err) {
        console.error('Fetch unread count error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Mark messages from a specific user as read
router.post('/mark-read/:otherId', requireAuth, async (req, res) => {
    try {
        const myId = req.session.user.id;
        const otherId = req.params.otherId;

        await Message.updateMany(
            { senderId: otherId, receiverId: myId, isRead: false },
            { $set: { isRead: true } }
        );

        res.json({ success: true });
    } catch (err) {
        console.error('Mark read error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get partner info
router.get('/partner/:otherId', requireAuth, async (req, res) => {
    try {
        const otherId = req.params.otherId;
        let partner = await Artist.findById(otherId).select('fullName profilePic specialization');
        let model = 'Artist';
        
        if (!partner) {
            partner = await User.findById(otherId).select('fullName profilePic');
            model = 'User';
        }
        
        if (!partner) {
            return res.status(404).json({ success: false, message: 'Partner not found' });
        }

        const onlineUsers = req.app.locals.onlineUsers;
        const isOnline = onlineUsers ? (onlineUsers.get(otherId) > 0) : false;

        res.json({
            success: true,
            partner: {
                fullName: partner.fullName,
                profilePic: partner.profilePic || (model === 'Artist' ? '/pics/user_profile.png' : 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + partner.fullName),
                subtitle: model === 'Artist' ? (partner.specialization || 'Artist') : 'Collector',
                isOnline
            }
        });
    } catch (err) {
        console.error('Partner fetch error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

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
