import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import routes from './routes/index';

const app = express();

// Set up logging
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

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