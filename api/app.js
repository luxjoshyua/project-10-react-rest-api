'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
// allow cross-origin resource sharing
const cors = require('cors');
const { sequelize } = require('./models');

// import the routes
const usersRoutes = require('./routes/user');
const coursesRoutes = require('./routes/course');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup request body json parsing
app.use(express.json());

// enable cors requests so 3000 + 5000 can talk to one another
app.use(cors());

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// test database connection
(async () => {
  try {
    await sequelize.authenticate();
    console.log(`Successfully connected to the database`);
    // try resync the database if experiencing errors
    // await sequelize.sync();
  } catch (error) {
    console.error(`Unable to connect to the database, ${error}`);
  }
})();

// tell routes to use api prefix
app.use('/api', usersRoutes);
app.use('/api', coursesRoutes);

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
