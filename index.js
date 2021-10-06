const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require( './database/config' );

// Create server
const app = express();

// Database
dbConnection();

// CORS
app.use(cors());

// Public directory
app.use(express.static('public'));

// Body parser
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));

// Listen
app.listen(process.env.PORT, () => {
	console.log(`Server running on port ${process.env.PORT}`);
});
