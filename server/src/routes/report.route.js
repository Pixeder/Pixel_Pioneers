import { Router } from 'express';
import { createReport } from '../controllers/report.controller.js';
import { verifyJWT } from '../middleware/auth.middlware.js';

const router = Router();

// All report routes are secured
router.use(verifyJWT);

router.route('/create').post(createReport);

export default router;
