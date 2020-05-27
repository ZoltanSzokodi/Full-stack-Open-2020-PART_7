const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const tokenExtractor = require('./middleware/tokenExtractor');
require('colors');

const app = express();

dotenv.config({ path: './config/config.env' });

// ENVIRONMENT VARS
let MONGODB_URI = process.env.MONGODB_URI;
let NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI;
}

connectDB(MONGODB_URI);

app.use(express.json());
app.use(cors());

// Extract token from req header
app.use(tokenExtractor);

// ROUTES =========================================
const blogs = require('./routes/blogs');
const users = require('./routes/users');
const login = require('./routes/login');

app.use('/api/blogs', blogs);
app.use('/api/users', users);
app.use('/api/login', login);

// Handle unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' });
};

app.use(errorHandler);
app.use(unknownEndpoint);

// Handle unhandled promise rejection (DB ERROR)
process.on('unhandledRejection', (error, promise) => {
  console.log(`DB ERROR: ${error.message}`.red.bold);
  process.close(() => process.exit(1));
});

module.exports = app;
