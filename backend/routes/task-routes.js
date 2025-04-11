const express = require('express');
const router = express.Router();
const { CreateTask } = require('../controller/task-controller');

router.post('/create-task', CreateTask);

module.exports = router;
