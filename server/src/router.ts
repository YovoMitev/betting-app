import Router from 'express';
import { EventRouter } from './modules/events';

const appRouter = Router();
appRouter.use('/events', EventRouter);

export default appRouter;
