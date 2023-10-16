import { Request, Response } from 'express';
import { EventService } from '..';

export const getEventsAction = async (req: Request, res: Response) => {
  try {
    console.log('is authenicated', req.user);
    const events = await EventService.getEvents();
    return res.json({ statusCode: 200, result: events });
  } catch (err) {
    const errMessage = err?.message || 'Something went wrong!';
    res.json({
      statusCode: 401,
      error: errMessage,
    });
  }
};
