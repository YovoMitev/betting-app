import Router from 'express';
import { EventController } from '.';
import { isAuthenticated } from '../../common';

const router = Router();
router.get('/list', isAuthenticated, EventController.getEventsAction);

export default router;
