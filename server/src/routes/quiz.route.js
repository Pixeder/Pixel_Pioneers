import { Router } from 'express';
import { createQuiz } from '../controllers/quiz.controller.js';
import { verifyJWT } from '../middleware/auth.middlware.js';

const router = Router();

// All quiz routes are secured
router.use(verifyJWT);

router.route('/create').post(createQuiz);

export default router;
