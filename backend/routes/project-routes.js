const express = require('express');
const router = express.Router();
const { createProject, getAllProjects } = require('../controller/project-controller');

router.post('/create-project', createProject);
router.get('/fetch-all-projects', getAllProjects);

module.exports = router;
