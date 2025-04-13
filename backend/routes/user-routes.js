const express = require('express');
const router = express.Router();
const {
	createUser,
	loginUser,
	checkAuth,
	fetchUser,
	fetchAllUsers,
	logoutUser,
} = require('../controller/user-controller');

router.post('/create-user', createUser);
router.post('/login', loginUser);
router.get('/check-session', checkAuth);
router.get('/fetch-user', fetchUser);
router.get('/fetch-all', fetchAllUsers);
router.get('/logout-user', logoutUser);

module.exports = router;
