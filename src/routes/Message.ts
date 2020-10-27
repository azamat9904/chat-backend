import express from 'express';
import { messageController } from '../controllers/index';

const router = express.Router();

router.get('/', messageController.getAll)
router.post('/', messageController.createMessage)
router.delete('/:id', messageController.deleteMessage)

export default router;