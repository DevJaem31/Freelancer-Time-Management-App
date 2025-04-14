const mongoose = require('mongoose');

const archiveProjectSchema = new mongoose.Schema(
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
			ref: 'Users',
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
				ref: 'Users',
			},
		],
		status: {
			type: String,
			enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
			default: 'Not Started',
		},
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Users',
			required: true,
		},
	},
	{ timestamps: true },
);

const ArchiveProject = mongoose.model('ArchiveProjects', archiveProjectSchema, 'ArchiveProjects');
module.exports = ArchiveProject;
