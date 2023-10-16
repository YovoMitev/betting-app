import Router from 'express';
import passport from 'passport';
import { UserController } from '.';

const router = Router();
router.post('/register', UserController.registerAction);
router.post('/login', passport.authenticate('local'), (_, res) => {
  res.json({ message: 'Authentication successful' });
});

export default router;
