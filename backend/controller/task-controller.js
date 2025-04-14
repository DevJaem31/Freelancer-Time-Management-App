const TaskModel = require('../model/task-model');

const CreateTask = async (req, res) => {
	try {
		const { projectID } = req.params;
		const {
			title,
			description,
			dueDate,
			startedAt,
			completedAt,
			assignedTo,
			tags,
			priority,
			status,
		} = req.body;
		const userId = req.session.id;

		if (!title || !userId) {
			return res.status(400).json({ message: 'Title and userId are required.' });
		}

		const newTask = new TaskModel({
			title,
			description: description || '',
			project: projectID,
			dueDate,
			startedAt,
			completedAt,
			assignedTo: assignedTo || userId,
			tags: tags || [],
			priority: priority || 'Medium',
			status: status || 'Not Started',
		});
		await newTask.save();

		res.status(201).json({ message: 'Task created successfully', task: newTask });
	} catch (error) {
		console.error('Error creating task:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const fetchProjectTask = async (req, res) => {
	try {
		const { projectID } = req.params;

		const foundTask = await TaskModel.find({ project: projectID })
			.populate('project', 'title')
			.populate('assignedTo', 'fullname');

		if (!foundTask) {
			console.error('Failed to find tasks');
		}

		res.status(200).json({ foundTask });
	} catch (error) {
		console.error('Error fetching tasks:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = { CreateTask, fetchProjectTask };
