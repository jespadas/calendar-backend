const { response } = require('express');
var bcrypt = require('bcryptjs');

const { generateJWT } = require('../helpers/jwt');
const UserModel = require('../models/UserModel');

const registerUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		let user = await UserModel.findOne({ email });

		if (user) {
			return res.status(400).json({
				ok: false,
				msg: 'This email is already taken',
			});
		}

		user = new UserModel(req.body);

		// Encrypt password
		const salt = bcrypt.genSaltSync();
		user.password = bcrypt.hashSync(password, salt);

		await user.save();

		// Generate JWT
		const token = await generateJWT(user.id, user.name);

		return res.status(201).json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

const loginUser = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(400).json({
				ok: false,
				msg: 'This email is not registered',
			});
		}

		// Match passwords
		const validPassword = bcrypt.compareSync(password, user.password);

		if (!validPassword) {
			return res.status(400).json({
				ok: false,
				msg: 'Wrong password',
			});
		}

		// Generate JWT
		const token = await generateJWT(user.id, user.name);

		res.json({
			ok: true,
			uid: user.id,
			name: user.name,
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: 'Please contact the administrator',
		});
	}
};

const renewToken = async (req, res) => {
	const {uid, name} = req;

	const token = await generateJWT(uid, name);

	return res.json({
		ok: true,
		token,
	});
};

module.exports = {
	registerUser,
	loginUser,
	renewToken,
};
