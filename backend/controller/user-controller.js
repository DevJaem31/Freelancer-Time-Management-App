const UserModel = require('../model/user-model');
const { hashPassword, comparePassword } = require('../helper/password-encrypt');
const { generateUserId } = require('../helper/generate-userID');

const createUser = async (req, res) => {
	try {
		const { username, email, password, fullname, confirmPassword, role, googleSignUp } = req.body;

		if (!email || !username || !role) {
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

		if (!googleSignUp) {
			if (!password || password !== confirmPassword) {
				return res.status(400).json({ message: 'Passwords do not match' });
			}

			if (password.length < 8) {
				return res.status(400).json({ message: 'Password must be at least 8 characters long' });
			}
			const userId = await generateUserId();
			const hashedPassword = await hashPassword(password);
			const newUser = new UserModel({
				userID: userId,
				username,
				fullname,
				email,
				role,
				password: hashedPassword,
				createdAt: new Date().toLocaleDateString('en-US', {
					year: 'numeric',
					month: 'long',
					day: 'numeric',
				}),
			});
			await newUser.save();
			return res.status(201).json({ message: 'User created successfully', userId: newUser._id });
		}

		const userId = await generateUserId();
		const newUser = new UserModel({
			userID: userId,
			username,
			email,
			fullname,
			role,
			googleSignUp: true,
			createdAt: new Date().toLocaleDateString('en-US', {
				year: 'numeric',
				month: 'long',
				day: 'numeric',
			}),
		});
		await newUser.save();

		res.status(201).json({ message: 'User created successfully', userId: newUser._id });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Server error during signup' });
	}
};

const loginUser = async (req, res) => {
	try {
		const { email, password, googleSignUp } = req.body;

		if (!email) {
			return res.status(400).json({ message: 'Email is required' });
		}

		const user = await UserModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: 'Invalid credentials' });
		}

		if (googleSignUp) {
			if (!user.googleSignUp) {
				return res.status(400).json({ message: 'Account is not registered with Google' });
			}

			req.session.user = user;
			res.status(200).json({ message: 'Login successful', userId: user.userID });
		} else {
			if (!password) {
				return res.status(400).json({ message: 'Password is required' });
			}
			const isMatch = await comparePassword(password, user.password);
			if (!isMatch) {
				return res.status(400).json({ message: 'Invalid credentials' });
			}
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
