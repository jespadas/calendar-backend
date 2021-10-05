const { response } = require('express');

const registerUser = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'register',
	});
};

const loginUser = (req, res = response) => {
	res.json({
		ok: true,
		msg: 'login',
	});
}

const renewUser = (req, res) => {
	res.json({
		ok: true,
		msg: 'renew',
	});
};

module.exports = {
	registerUser,
    loginUser,
    renewUser
};
