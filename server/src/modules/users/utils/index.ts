import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../../../config/environment';
import { IAuthTokenData } from '../../../common';

export const generateSalt = () => crypto.randomBytes(16).toString('base64');
export const encryptPassword = ({
  password,
  salt,
}: {
  password: string;
  salt: string;
}) =>
  crypto
    .createHash('RSA-SHA256')
    .update(password)
    .update(salt)
    .digest('base64');

export const generateAccessToken = ({
  data,
  expiresIn = '90d',
}: {
  data: IAuthTokenData;
  expiresIn?: string;
}) => {
  const accessToken = jwt.sign(data, JWT_SECRET as string, {
    expiresIn: expiresIn,
  });

  return accessToken;
};

export const verifyAccessToken = (token: string) => {
  try {
    const decodedToken = jwt.verify(
      token,
      JWT_SECRET as string
    ) as IAuthTokenData;

    return {
      decodedToken,
      errMessage: null,
    };
  } catch (err) {
    const errType = err.name === 'TokenExpiredError' ? 'expired' : 'invalid';
    return {
      decodedToken: null,
      errMessage: `The provided token is ${errType}!`,
    };
  }
};
