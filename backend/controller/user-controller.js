const UserModel = require('../model/user-model');
const { hashPassword, comparePassword } = require('../helper/password-encrypt');
const { generateUserId } = require('../helper/generate-userID');

const createUser = async (req, res) => {
	try {
		const { username, email, password, confirmPassword, role } = req.body;

		if (!username || !email || !password || !confirmPassword) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({ message: 'Invalid email format' });
		}

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		if (username.length < 3) {
			return res.status(400).json({ message: 'Username must be at least 3 characters long' });
		}

		if (password.length < 8) {
			return res.status(400).json({ message: 'Password must be at least 8 characters long' });
		}

		if (password !== confirmPassword) {
			return res.status(400).json({ message: 'Passwords do not match' });
		}

		if (password.length < 8) {
			return res.status(400).json({ message: 'Password must be at least 6 characters long' });
		}

		const hashedPassword = await hashPassword(password);
		const userId = await generateUserId();

		const newUser = new UserModel({
			userID: userId,
			createdAt: new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
			username,
			email,
			role,
			password: hashedPassword,
		});

		await newUser.save();

		res.status(201).json({ message: 'User created successfully', userId });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error during signup' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.status(400).json({ message: 'All fields are required' });
		}

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		const isMatch = await comparePassword(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		req.session.user = user;
		res.status(200).json({ message: 'Login successful', userId: user.userID });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error during login' });
	}
};

module.exports = {
	createUser,
	loginUser,
};
