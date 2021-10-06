/* 
	User routes / Auth
	host + /api/auth
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { fieldValidator } = require('../middlewares/fieldValidator');
const { registerUser, loginUser, renewToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwtValidator');

router.post(
	'/register',
	[
		check('name', 'The name is required').not().isEmpty(),
		check('email', 'The email is required').isEmail(),
		check('password', 'The password must have at least 6 characters').isLength({
			min: 6,
		}),
		fieldValidator,
	],
	registerUser
);

router.post(
	'/login',
	[
		check('email', 'The email is required').isEmail(),
		check('password', 'The password must have at least 6 characters').isLength({
			min: 6,
		}),
		fieldValidator,
	],
	loginUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
