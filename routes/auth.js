/* 
	User routes / Auth
	host + /api/auth
*/

const { Router } = require('express');
const router = Router();
const { registerUser, loginUser, renewUser } = require('../controllers/auth');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/renew', renewUser);

module.exports = router;
