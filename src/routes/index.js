// index.js
// configure routes here
import express, { Router } from 'express';
import user from './user';
console.log('user routes');
let app = express();
//let router = express.Router();
//let userRouter = express.Router();


app.use('/', user);

export default app;