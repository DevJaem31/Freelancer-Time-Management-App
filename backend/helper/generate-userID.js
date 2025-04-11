const CounterModel = require('../model/counter-model');

const generateUserId = async () => {
	const now = new Date();
	const month = String(now.getMonth() + 1).padStart(2, '0');
	const year = now.getFullYear();
	const prefix = `${month}-${year}`;

	const updatedCounter = await CounterModel.findByIdAndUpdate(
		prefix,
		{ $inc: { seq: 1 } },
		{ new: true, upsert: true },
	);

	const paddedSeq = String(updatedCounter.seq).padStart(6, '0');
	return `${prefix}-${paddedSeq}`;
};

module.exports = {
	generateUserId,
};
