const UserModel = require('../model/user-model.js');

const generateUserId = async () => {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();
	const prefix = `${month}-${year}-`;

	const users = await UserModel.find({ userId: { $regex: `^${prefix}` } }).select('userId -_id');

	const numbers = users
		.map((u) => parseInt(u.userId.split('-')[2]))
		.filter((n) => !isNaN(n))
		.sort((a, b) => a - b);

	let uniqueNumber = 1;
	for (let i = 0; i < numbers.length; i++) {
		if (numbers[i] !== i + 1) {
			uniqueNumber = i + 1;
			break;
		}
		uniqueNumber = numbers.length + 1;
	}
	const paddedNumber = String(uniqueNumber).padStart(6, '0');
	const newUserId = `${prefix}${paddedNumber}`;
	return newUserId;
};

module.exports = {
	generateUserId,
};
