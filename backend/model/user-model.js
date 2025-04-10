const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
	userID: {
		type: String,
		required: true,
	},
	createdAt: {
		type: String,
		default: new Date().toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		}),
	},
	googleSignUp: { type: Boolean, default: false },
	username: {
		type: String,
		required: true,
		minlength: 3,
	},
	role: {
		type: String,
		required: true,
		default: 'client',
	},
	email: {
		type: String,
		required: true,
		unique: true,
		match: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
	},
	password: {
		type: String,
		required: function () {
			return !this.googleSignUp;
		},
	},
});

const UserModel = mongoose.model('Users', userSchema, 'Users');

module.exports = UserModel;
