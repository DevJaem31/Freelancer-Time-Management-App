const TaskModel = require('../model/task-model');

const CreateTask = async (req, res) => {
	try {
		const { title, userId, dueDate, startedAt, completedAt, assignedTo, client, tags } = req.body;

		if (!title || !userId) {
			return res.status(400).json({ message: 'Title and userId are required.' });
		}

		const newTask = new TaskModel({
			title,
			userId,
			dueDate,
			startedAt,
			completedAt,
			assignedTo,
			client,
			tags,
		});

		await newTask.save();

		res.status(201).json({ message: 'Task created successfully', task: newTask });
	} catch (error) {
		console.error('Error creating task:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = { CreateTask };
