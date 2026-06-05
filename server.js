const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/paintedmuse';

// Database connection
mongoose.connect(MONGO_URI).then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB Connection Error:', err));

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Session configuration
const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET || 'default_fallback_secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGO_URI }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
});
app.use(sessionMiddleware);

io.use((socket, next) => {
    sessionMiddleware(socket.request, socket.request.res || {}, next);
});

// Make session available to all EJS templates
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    res.locals.userType = req.session.userType || null;
    next();
});

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const adminApiRoutes = require('./routes/adminApi');
const chatApiRoutes = require('./routes/chatApi');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/api/admin', adminApiRoutes);
app.use('/api/chat', chatApiRoutes);

// Seed Default Admin Account
const Admin = require('./models/Admin');
mongoose.connection.once('open', async () => {
    try {
        const count = await Admin.countDocuments();
        if (count === 0) {
            const adminPassword = process.env.ADMIN_PASSWORD;
            const defaultAdmin = new Admin({ email: 'admin@paintedmuse.com', password: adminPassword });
            await defaultAdmin.save();
            console.log('Default Admin Account created.');
        }
    } catch (err) {
        console.error('Error seeding admin account:', err);
    }
});

// Socket.IO Logic
const Message = require('./models/Message');

io.on('connection', (socket) => {
    const session = socket.request.session;
    if (session && session.user) {
        socket.join(session.user.id);
        
        socket.on('sendMessage', async (data) => {
            try {
                const { receiverId, content } = data;
                if (!receiverId || !content) return;
                
                const senderId = session.user.id;
                const senderModel = session.userType === 'artist' ? 'Artist' : 'User';
                const receiverModel = session.userType === 'artist' ? 'User' : 'Artist';

                const msg = new Message({
                    senderId,
                    senderModel,
                    receiverId,
                    receiverModel,
                    content
                });
                await msg.save();
                
                // Emit to receiver's room and sender's room
                io.to(receiverId).emit('newMessage', msg);
                socket.emit('newMessage', msg);
            } catch (err) {
                console.error('Socket message error:', err);
            }
        });
    }
});

// Error handling middleware
app.use((req, res, next) => {
    res.status(404).render('checkout-failure', {
        message: 'Page Not Found'
    }); // Repurposed for simple 404 for now
});

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
