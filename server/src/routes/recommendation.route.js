import { Router } from 'express';
import { findResources } from '../controllers/recommendation.controller.js';
import { verifyJWT } from '../middleware/auth.middlware.js';

const router = Router();

// All recommendation routes are secured
router.use(verifyJWT);

router.route('/find').post(findResources);

export default router;
