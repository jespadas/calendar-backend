const { response } = require('express');
const { validationResult } = require('express-validator');

const registerUser = (req, res = response) => {
	const { name, email, password } = req.body;

	return res.status(201).json({
		ok: true,
		msg: 'register',
		name,
		email,
		password,
	});
};

const loginUser = (req, res = response) => {
	const { email, password } = req.body;

	return res.status(200).json({
		ok: true,
		msg: 'login',
		email,
		password,
	});
};

const renewToken = (req, res) => {
	return res.json({
		ok: true,
		msg: 'renew',
	});
};

module.exports = {
	registerUser,
	loginUser,
	renewToken,
};
