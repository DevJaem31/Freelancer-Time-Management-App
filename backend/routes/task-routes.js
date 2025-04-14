const express = require('express');
const router = express.Router();
const { CreateTask, fetchProjectTask } = require('../controller/task-controller');

router.post('/create-task/:projectID', CreateTask);
router.get('/fetch-project-tasks/:projectID', fetchProjectTask);

module.exports = router;
