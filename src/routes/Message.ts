import express from 'express';
import Message from '../controllers/Message';

export default (messageController: Message) => {
    const router = express.Router();
    router.get('/', messageController.getAll)
    router.post('/', messageController.createMessage);
    router.delete('/:id', messageController.deleteMessage);
    return router;
}
