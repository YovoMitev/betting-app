import Router from 'express';
import { EventRouter } from './modules/events';
import { UserRouter } from './modules/users';

const appRouter = Router();
appRouter.use('/events', EventRouter);
appRouter.use('/users', UserRouter);

export default appRouter;
