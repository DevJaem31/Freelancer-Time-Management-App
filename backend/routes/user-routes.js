const express = require('express');
const router = express.Router();
const {
	limiter,
	validateRegister,
	validateLogin,
	handleValidation,
} = require('../helper/security');
const {
	createUser,
	loginUser,
	checkAuth,
	fetchUser,
	fetchAllUsers,
	logoutUser,
} = require('../controller/user-controller');

router.post('/create-user', limiter, validateRegister, handleValidation, createUser);
router.post('/login', limiter, validateLogin, handleValidation, loginUser);
router.get('/check-session', checkAuth);
router.get('/fetch-user', fetchUser);
router.get('/fetch-all', fetchAllUsers);
router.get('/logout-user', logoutUser);

module.exports = router;
