import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/auth.middlware.js';

const router = Router();

// Public routes
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// Secured routes (require authentication)
router.route('/logout').post(verifyJWT, logoutUser);

export default router;
