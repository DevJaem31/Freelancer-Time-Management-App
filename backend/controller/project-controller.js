const Project = require('../model/project-model');
const ArchiveProject = require('../model/archive-project-model');

const isAuthorized = async (userId, projectId) => {
	const project = await Project.findById(projectId);
	if (!project || !project.createdBy) return false;

	return (
		project.createdBy.toString() === userId ||
		project.collaborators.map((id) => id.toString()).includes(userId)
	);
};

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

		const ownedProjects = [];
		const collaboratedProjects = [];

		projects.forEach((project) => {
			if (project.createdBy._id.toString() === userId) {
				ownedProjects.push(project);
			} else {
				collaboratedProjects.push(project);
			}
		});

		res.status(200).json({
			myProjects: ownedProjects,
			collaboratedProjects: collaboratedProjects,
		});
	} catch (error) {
		console.error('Error fetching projects:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const getProject = async (req, res) => {
	try {
		const userId = req.session.user?.id;
		const projectID = req.params.projectID;

		if (!(await isAuthorized(userId, projectID))) {
			return res.status(403).json({ error: 'You are not authorized to access this project' });
		}

		const project = await Project.findById(projectID)
			.populate('client', 'fullname')
			.populate('collaborators', 'fullname')
			.populate('createdBy', 'fullname');

		res.status(200).json({ project });
	} catch (error) {
		console.error('Error fetching project:', error);
		res.status(500).json({ message: 'Internal server error' });
	}
};

const editProject = async (req, res) => {
	const { projectID } = req.params;
	const updateBody = req.body;

	try {
		const updatedProject = await Project.findByIdAndUpdate(projectID, updateBody, {
			new: true,
			runValidators: true,
		});

		if (!updatedProject) {
			return res.status(404).json({ message: 'Project not found' });
		}

		res.status(200).json(updatedProject);
	} catch (error) {
		console.error('Error editing project:', error);
		res.status(500).json({ message: 'Server error', error });
	}
};

const archiveProject = async (req, res) => {
	const { projectID } = req.params;
	try {
		const project = await Project.findById(projectID);
		if (!project) {
			return res.status(404).json({ message: 'Project not found' });
		}

		const archivedProject = new ArchiveProject({
			title: project.title,
			description: project.description,
			client: project.client,
			dueDate: project.dueDate,
			tasks: project.tasks,
			collaborators: project.collaborators,
			status: project.status,
			createdBy: project.createdBy,
		});

		await archivedProject.save();

		await Project.findByIdAndDelete(projectID);
		return res.status(200).json({ message: 'Project archived successfully', archivedProject });
	} catch (error) {
		console.error('Error archiving project:', error);
		return res.status(500).json({ message: 'Internal server error' });
	}
};

module.exports = { createProject, getAllProjects, getProject, editProject, archiveProject };
