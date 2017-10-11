import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import config from './config/database'
import routes from './routes/index';

const app = express();

// MongoDB Connection Configuration
// Set native promises as mongoose promise
mongoose.Promise = global.Promise;
mongoose.connect(config.database, (error) => {
    if (error) {
      console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
      throw error;
    }
});

app.set('superSecret', config.secret);

// Set up body parse so we can get info from POST and/or URL params
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Set up logging
app.use(morgan('dev'));

// =========================
//         Routing
// =========================
app.use('/api', routes);

// Catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
})

// Error handler
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    res
      .status(err.status || 500)
      .send({
        message: err.message
      });
  });

export default app;