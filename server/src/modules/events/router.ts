import Router from 'express';
import { EventController } from '.';

const router = Router();
router.get(
  '/list',
  (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    }
    res.send('Unnotarized!');
  },
  EventController.getEventsAction
);

export default router;
