const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
require('dotenv').config();

// mongodb config
require('./config/db');

// require routes
const users = require('./src/routes/users');

// Initializing express app
const app = express();

// Adds helmet middleware
app.use(helmet());

// Etag disable
app.set('etag', false);

// Body Parser Configuration
app.use(bodyParser.json({ // to support JSON-encoded bodies
  limit: '1mb'
}));

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
  limit: '1mb',
  extended: true
}));

// Using CORS
app.use(cors());

// Router Initialization
app.get('/v1', (req, res) => {
  res.status(200).json({
    msg: 'Welcome to musings server'
  });
});
app.use('/v1/user', users);

module.exports = app;
