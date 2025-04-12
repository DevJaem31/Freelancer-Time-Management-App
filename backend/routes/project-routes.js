const express = require('express');
const router = express.Router();
const { createProject } = require('../controller/project-controller');

router.post('/create-project', createProject);

module.exports = router;
