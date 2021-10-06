const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {
	return new Promise((resolve, reject) => {
		const payload = { uid, name };

        // Signature
		jwt.sign(
			payload,
			process.env.SECRET_JWT_SEED,
			{
				expiresIn: '2h',
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject('Token not generated');
				}
                resolve(token);
			}
		);

	});
};

module.exports = {
	generateJWT,
};
