const express = require('express');
const router = express.Router();
const { createProject, getAllProjects, getProject } = require('../controller/project-controller');

router.post('/create-project', createProject);
router.get('/fetch-all-projects', getAllProjects);
router.get('/fetch-byID/:projectID', getProject);

module.exports = router;
