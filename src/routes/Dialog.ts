import express from 'express';
import Dialog from '../controllers/Dialog';

export default (dialogController: Dialog) => {
    const router = express.Router();
    router.get('/', dialogController.getAll);
    router.post('/', dialogController.createDialog);
    router.delete('/:id', dialogController.deleteDialog);
    return router;
}
