const express = require('express');
const router = express.Router();
const {
	createProject,
	getAllProjects,
	getProject,
	editProject,
	archiveProject,
} = require('../controller/project-controller');

router.post('/create-project', createProject);
router.get('/fetch-all-projects', getAllProjects);
router.get('/fetch-byID/:projectID', getProject);
router.patch('/edit-project/:projectID', editProject);
router.post('/archive-project/:projectID', archiveProject);

module.exports = router;
