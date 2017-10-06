// index.js
// configure routes here
import { Router } from 'express';
import * as UserController from '../controllers/user.controller';
import { isAuthenticated } from '../controllers/auth.controller';
const router = new Router();

//let app = express();
//let router = express.Router();
//let userRouter = express.Router();

// router.use()
// app.use('/', user);

// User auth routes
router.route('/register').post(UserController.register);

router.route('/login').post(UserController.login);

router.route('/users').get(isAuthenticated, UserController.getAllUsers);

router.route('/updateUserInfo').post(UserController.updateUserInfo);

// User Routes
router.route('/users').get(isAuthenticated, UserController.getAllUsers);

router.route('/user/:id').delete(isAuthenticated, UserController.deleteUser);


export default router;