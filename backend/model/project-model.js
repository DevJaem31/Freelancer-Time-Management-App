const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		client: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
		},
		dueDate: {
			type: Date,
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Tasks',
			},
		],
		collaborators: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'User',
			},
		],
		status: {
			type: String,
			enum: ['not-started', 'in-progress', 'completed', 'on-hold'],
			default: 'not-started',
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

const Project = mongoose.model('Projects', projectSchema, 'Projects');
module.exports = Project;
