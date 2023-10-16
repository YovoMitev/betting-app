import { Request, Response } from 'express';
import { UserService } from '..';

export const registerAction = async (req: Request, res: Response) => {
  try {
    const user = await UserService.register(req.body);
    return res.json({ statusCode: 200, result: user });
  } catch (err) {
    const errMessage = err?.message || 'Something went wrong!';
    res.json({
      statusCode: 401,
      error: errMessage,
    });
  }
};
