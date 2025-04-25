const UserModel = require('../model/user-model');
const { hashPassword, comparePassword } = require('../helper/password-encrypt');
const { generateUserId } = require('../helper/generate-userID');

const createUser = async (req, res) => {
	try {
		const { username, email, password, fullname, role, googleSignUp } = req.body;

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const userID = await generateUserId();
		const createdAt = new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

		const userPayload = {
			userID,
			username,
			fullname,
			email,
			role,
			createdAt,
		};

		if (!googleSignUp) {
			userPayload.password = await hashPassword(password);
		} else {
			userPayload.googleSignUp = true;
		}

		const newUser = new UserModel(userPayload);
		await newUser.save();

		res.status(201).json({ message: 'User created successfully', userId: newUser._id });
	} catch (error) {
		console.error('Signup error:', error);
		res.status(500).json({ message: 'Server error during signup' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password, googleSignUp } = req.body;

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		if (googleSignUp) {
			if (!user.googleSignUp) {
				return res.status(400).json({ message: 'Account is not registered with Google' });
			}
		} else {
			const isMatch = await comparePassword(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}
		}

		req.session.user = { id: user._id, email: user.email };
		res.status(200).json({ message: 'Login successful', userId: user.userID });
	} catch (error) {
		console.error('Login error:', error);
		res.status(500).json({ message: 'Server error during login' });
	}
};

const checkAuth = (req, res) => {
	if (req.session.user) {
		res.status(200).json({ message: 'User is authenticated' });
	} else {
		res.status(401).json({ message: 'Not authenticated' });
	}
};

const fetchUser = async (req, res) => {
	if (!req.session.user) {
		return res.status(401).json({ authenticated: false });
	}

	try {
		const user = await UserModel.findById(req.session.user.id);
		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}
		res.status(200).json({ authenticated: true, user });
	} catch (error) {
		console.error('Fetch user error:', error);
		res.status(500).json({ message: 'Server error while fetching user' });
	}
};

const fetchAllUsers = async (req, res) => {
	try {
		const users = await UserModel.find();
		res.status(200).json(users);
	} catch (error) {
		console.error('Fetch all users error:', error);
		res.status(500).json({ message: 'Server error' });
	}
};

const logoutUser = (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			return res.status(500).json({ message: 'Logout failed' });
		}
		res.clearCookie('connect.sid');
		res.status(200).json({ message: 'Logout successful' });
	});
};

module.exports = {
	createUser,
	loginUser,
	checkAuth,
	fetchUser,
	fetchAllUsers,
	logoutUser,
};
