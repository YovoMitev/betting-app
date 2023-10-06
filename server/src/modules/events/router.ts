import Router from 'express';
import { EventController } from '.';

const router = Router();
router.get('/list', EventController.getEventsAction);

export default router;
