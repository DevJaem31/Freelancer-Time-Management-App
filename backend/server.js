const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const userRoutes = require('./routes/user-routes');
const taskRoutes = require('./routes/task-routes');
const cron = require('node-cron');
const axios = require('axios');

if (process.env.NODE_ENV === 'production') {
	dotenv.config({ path: '.env.production' });
} else {
	dotenv.config({ path: '.env.development' });
}

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.set('trust proxy', 1);

app.use(
	cors({
		origin:
			process.env.NODE_ENV === 'production'
				? 'https://freelancer-time-management-app.vercel.app'
				: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
);

app.use(
	session({
		name: 'connect.sid',
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: process.env.MONGO_URI,
			collectionName: 'sessions',
		}),
		cookie: {
			secure: process.env.NODE_ENV === 'production',
			httpOnly: true,
			maxAge: 24 * 60 * 60 * 1000,
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
		},
	}),
);

app.use('/', userRoutes);
app.use('/', taskRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Database Connected'))
	.catch((err) => console.log('Failed to Connect!', err));

cron.schedule('*/5 * * * *', () => {
	console.log('Pinging server to keep it active...');
	axios
		.get('https://freelancer-time-management-app.onrender.com/keep-alive')
		.then((response) => {
			console.log('Server ping successful:', response.status);
		})
		.catch((error) => {
			console.error('Error pinging server:', error);
		});
});

app.get('/keep-alive', (req, res) => {
	res.status(200).send('Server is active');
});

server.listen(5000, () => {
	console.log('Server is running on port 5000');
});
