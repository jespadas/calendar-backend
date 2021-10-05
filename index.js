const express = require('express');
require('dotenv').config();

// Create server
const app = express();

// Public directory
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listen
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
