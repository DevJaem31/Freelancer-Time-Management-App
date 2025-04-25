const rateLimit = require('express-rate-limit');
const { body } = require('express-validator');
const { validationResult } = require('express-validator');

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60 });

const validateRegister = [
	body('username').isLength({ min: 3 }),
	body('email').isEmail(),
	body('password').isLength({ min: 6 }),
	body('confirmPassword').custom((value, { req }) => value === req.body.password),
];

const validateLogin = [body('email').isEmail(), body('password').optional().isLength({ min: 6 })];

const handleValidation = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	next();
};

module.exports = { limiter, validateRegister, validateLogin, handleValidation };
