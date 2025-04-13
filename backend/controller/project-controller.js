const Project = require('../model/project-model');

const createProject = async (req, res) => {
	try {
		const { title, description, client, dueDate, collaborators, status } = req.body;

		const userId = req.session.user?.id;

		if (!title || !client || !dueDate) {
			return res.status(500).json({ message: 'Fill all the fields' });
		}

		const project = new Project({
			title,
			description,
			client,
			dueDate,
			collaborators,
			status,
			createdBy: userId,
		});

		await project.save();
		res.status(201).json({ message: 'Project Added', project: project });
	} catch (error) {
		console.error('Error creating project:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getAllProjects = async (req, res) => {
	try {
		const userId = req.session.user?.id;

		const projects = await Project.find({
			$or: [{ createdBy: userId }, { collaborators: userId }],
		})
			.populate('client', 'fullname')
			.populate('collaborators', 'fullname')
			.populate('createdBy', 'fullname');

		if (!projects || projects.length === 0) {
			return res.status(404).json({ message: 'No projects found' });
		}

		res.status(200).json({ projects });
	} catch (error) {
		console.error('Error fetching projects:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getProject = async (req, res) => {
	try {
		const projectID = req.params.projectID;

		const project = await Project.findById(projectID)
			.populate('client', 'fullname')
			.populate('collaborators', 'fullname')
			.populate('createdBy', 'fullname');

		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.status(200).json({ project });
	} catch (error) {
		console.error('Error fetching project:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = { createProject, getAllProjects, getProject };
