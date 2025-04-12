const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		description: {
			type: String,
			default: '',
			trim: true,
		},
		status: {
			type: String,
			enum: ['pending', 'in-progress', 'completed', 'archived'],
			default: 'pending',
		},
		priority: {
			type: String,
			enum: ['low', 'medium', 'high', 'urgent'],
			default: 'medium',
		},
		dueDate: {
			type: Date,
		},
		startedAt: {
			type: Date,
		},
		completedAt: {
			type: Date,
		},

		assignedTo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},

		tags: [
			{
				type: String,
			},
		],
	},
	{ timestamps: true },
);

const TaskModel = mongoose.model('Tasks', TaskSchema, 'Tasks');

module.exports = TaskModel;
