const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Artist = require('../models/Artist');
const validator = require('validator');
const { validate: deepValidateEmail } = require('deep-email-validator');

async function checkEmail(email) {
    if (!email || !validator.isEmail(email)) {
        return { valid: false, message: 'Invalid email format.' };
    }
    return { valid: true };
}

// --- USER AUTHENTICATION ---

// User Signup
router.post('/user-signup', async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        const emailValidation = await checkEmail(email);
        if (!emailValidation.valid) {
            return res.status(400).json({ success: false, message: emailValidation.message });
        }
        
        // Check if user exists
        let existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email is already registered.' });
        }

        const newUser = new User({ fullName, email, password });
        await newUser.save();
        
        // Log them in immediately
        req.session.user = { id: newUser._id, fullName: newUser.fullName, email: newUser.email };
        req.session.userType = 'user';
        
        res.status(201).json({ success: true, message: 'Signup successful! Redirecting...', redirect: '/dashboard', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during signup.' });
    }
});

// User Signin
router.post('/user-signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
        
        req.session.user = { id: user._id, fullName: user.fullName, email: user.email };
        req.session.userType = 'user';
        
        res.status(200).json({ success: true, message: 'Login successful! Redirecting...', redirect: '/dashboard', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
});

// --- ARTIST AUTHENTICATION ---

// Artist Signup
router.post('/artist-signup', async (req, res) => {
    try {
        const { fullName, specialization, otherSpecialization, location, email, password } = req.body;
        
        const emailValidation = await checkEmail(email);
        if (!emailValidation.valid) {
            return res.status(400).json({ success: false, message: emailValidation.message });
        }
        
        // Check if artist exists
        let existingArtist = await Artist.findOne({ email });
        if (existingArtist) {
            return res.status(400).json({ success: false, message: 'Email is already registered.' });
        }

        const newArtist = new Artist({ 
            fullName, 
            email, 
            password,
            specialization,
            otherSpecialization: specialization === 'Other' ? otherSpecialization : '',
            location
        });
        
        await newArtist.save();
        
        res.status(201).json({ 
            success: true, 
            message: 'Application submitted! Waiting for Admin approval.', 
            redirect: '/signin' // Redirect back to sign in
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during signup.' });
    }
});

// Artist Signin
router.post('/artist-signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        if (!email || !validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format.' });
        }
        
        const artist = await Artist.findOne({ email });
        if (!artist) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
        
        const isMatch = await artist.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password.' });
        }
        
        if (artist.status === 'REJECTED') {
            return res.status(403).json({ success: false, message: 'Your application was rejected - you do not appear to be an authentic artisan.' });
        }
        if (artist.status === 'PENDING') {
            return res.status(403).json({ success: false, message: 'Your application is pending Admin approval.' });
        }
        
        req.session.user = { id: artist._id, fullName: artist.fullName, email: artist.email };
        req.session.userType = 'artist';
        
        res.status(200).json({ success: true, message: 'Login successful! Redirecting...', redirect: '/artist-home', user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error during login.' });
    }
});

// Update Artist Profile
router.post('/artist/profile', async (req, res) => {
    if (!req.session || !req.session.user || req.session.userType !== 'artist') {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    try {
        const { displayName, specialization, location, photoUrl } = req.body;
        const updateData = {};
        if (displayName) updateData.fullName = displayName;
        if (specialization) updateData.specialization = specialization;
        if (location) updateData.location = location;
        if (photoUrl) updateData.profilePic = photoUrl;

        await Artist.findByIdAndUpdate(req.session.user.id, updateData);
        
        // Also update session
        if (displayName) req.session.user.fullName = displayName;
        
        res.json({ success: true });
    } catch (err) {
        console.error('Update artist profile error:', err);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Logout
router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Failed to logout' });
        }
        res.clearCookie('connect.sid');
        res.status(200).json({ success: true, redirect: '/' });
    });
});

// Get Session Status
router.get('/status', (req, res) => {
    if (req.session.user) {
        res.json({ loggedIn: true, user: req.session.user, userType: req.session.userType });
    } else {
        res.json({ loggedIn: false });
    }
});

module.exports = router;
