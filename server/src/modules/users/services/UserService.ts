import {
  generateSalt,
  encryptPassword,
  UserProvider,
  generateAccessToken,
} from '../';

export const register = async (payload: {
  password: string;
  email: string;
}) => {
  let user;
  const { password, email } = payload;
  try {
    user = await UserProvider.getByEmail(email);
    if (user) {
      throw new Error('User already exist with given email!');
    }

    const salt = generateSalt();
    const encryptedPassword = encryptPassword({ password, salt });
    user = await UserProvider.create({
      salt,
      email,
      password: encryptedPassword,
    });

    return user;
  } catch (err) {
    console.error(
      'An error occurred while tring to register user:',
      err.message
    );
    throw new Error(err);
  }
};

export const login = async (payload: { password: string; email: string }) => {
  let user;
  const { password, email } = payload;
  try {
    user = await UserProvider.getByEmail(email);
    if (!user) {
      throw new Error('Invalid credentials!');
    }

    const encryptedPassword = encryptPassword({ password, salt: user.salt });
    if (encryptedPassword !== user.password) {
      throw new Error('Invalid credentials!');
    }

    const accessToken = generateAccessToken({ data: { id: user.id, email } });
    return { user, accessToken };
  } catch (err) {
    console.error(
      'An error occurred while tring to register user:',
      err.message
    );
    throw new Error(err);
  }
};
