import Router from 'express';
import { UserController } from '.';

const router = Router();
router.post('/register', UserController.registerAction);
router.post('/login', UserController.loginAction);

export default router;
