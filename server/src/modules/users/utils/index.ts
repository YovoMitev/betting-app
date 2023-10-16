import crypto from 'crypto';

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
