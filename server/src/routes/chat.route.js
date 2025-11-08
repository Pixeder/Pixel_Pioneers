import { Router } from 'express';
import {
  handleChatInteraction,
  getChatHistory,
  getAllUserChats,
} from '../controllers/chat.controller.js';
import { verifyJWT } from '../middleware/auth.middlware.js';

const router = Router();

// All chat routes are secured
router.use(verifyJWT);

router.route('/')
  .post(handleChatInteraction)
  .get(getAllUserChats);
  
router.route('/history/:chatId')
  .get(getChatHistory);

export default router;
