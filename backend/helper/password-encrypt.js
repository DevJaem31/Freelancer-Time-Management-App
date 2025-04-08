const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

const hashPassword = async (plainPassword) => {
	try {
		const hash = await bcrypt.hash(plainPassword, SALT_ROUNDS);
		return hash;
	} catch (error) {
		throw new Error('Password hashing failed');
	}
};

const comparePassword = async (plainPassword, hashedPassword) => {
	try {
		const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
		return isMatch;
	} catch (error) {
		throw new Error('Password comparison failed');
	}
};

module.exports = {
	hashPassword,
	comparePassword,
};
