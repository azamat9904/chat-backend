import express from 'express';
import { dialogController } from '../controllers/index';

const router = express.Router();

router.get('/', dialogController.getAll);
router.post('/', dialogController.createDialog);
router.delete('/:id', dialogController.deleteDialog);

export default router;