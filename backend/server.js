const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const dotenv = require('dotenv');
const http = require('http');
const userRoutes = require('./routes/user-routes');

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
				? 'https://yourproductiondomain.com'
				: 'http://localhost:5173',
		methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
		allowedHeaders: ['Content-Type', 'Authorization'],
		credentials: true,
	}),
);

app.use(
	session({
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
			sameSite: 'none',
		},
	}),
);

app.use('/', userRoutes);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => console.log('Database Connected'))
	.catch((err) => console.log('Failed to Connect!', err));

server.listen(3000, () => {
	console.log('Server is running on port 3000');
});
