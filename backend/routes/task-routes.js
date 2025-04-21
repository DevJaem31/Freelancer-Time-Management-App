const express = require('express');
const router = express.Router();
const { CreateTask, fetchProjectTask, fetchTaskByID } = require('../controller/task-controller');

router.post('/create-task/:projectID', CreateTask);
router.get('/fetch-project-tasks/:projectID', fetchProjectTask);
router.get('/fetch-taskID/:tasksID', fetchTaskByID);

module.exports = router;
