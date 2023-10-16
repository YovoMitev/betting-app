import { NextFunction, Request, Response } from 'express';
import { verifyAccessToken } from '../../modules/users';
import { IAuthTokenData } from '../interfaces';

declare module 'express-serve-static-core' {
  interface Request {
    user: IAuthTokenData;
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers || !req.headers.authorization) {
    return res.status(401).json({ message: 'Token is not provided!' });
  }
  const bearerHeader = req.headers.authorization;
  const bearer = bearerHeader.split(' ');
  const token = bearer[1];

  const { decodedToken, errMessage } = verifyAccessToken(token);
  if (!decodedToken) {
    return res.status(401).json({ message: errMessage });
  }

  req.user = decodedToken;
  return next();
};
