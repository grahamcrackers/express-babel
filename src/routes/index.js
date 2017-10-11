import { register, login } from '../controllers/auth.controller';
import { getAllUsers, getUser } from '../controllers/user.controller';
import express from 'express';
import passport from '../config/passport';

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});

// Define new router
const router = express.Router();

// Register Routes
router.post('/register', register);

// Unprotected Route
router.post('/user', getUser);

// Login Route
router.post('/login', requireLogin, login);

// Routes needed for Authorization
router.post('/users', requireAuth, getAllUsers);

export default router;