const express = require('express');
const router = express.Router();
const { createUser, loginUser, checkAuth, fetchUser } = require('../controller/user-controller');

router.post('/create-user', createUser);
router.post('/login', loginUser);
router.get('/check-session', checkAuth);
router.get('/fetch-user', fetchUser);

module.exports = router;
