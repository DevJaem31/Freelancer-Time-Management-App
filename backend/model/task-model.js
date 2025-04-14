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
		project: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Projects',
			required: true,
		},
		status: {
			type: String,
			enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
			default: 'Not Started',
		},
		priority: {
			type: String,
			enum: ['Low', 'Medium', 'High', 'Urgent'],
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
			ref: 'Users',
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
