import { generateSalt, encryptPassword, UserProvider } from '../';

export const getById = (id: number) => UserProvider.getById(id);

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

export const authenticate = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  let user;
  try {
    user = await UserProvider.getByEmail(email);
    if (!user) {
      return null;
    }

    const encryptedPassword = encryptPassword({ password, salt: user.salt });
    if (encryptedPassword !== user.password) {
      return null;
    }

    return user;
  } catch (err) {
    console.error(
      'An error occurred while tring to register user:',
      err.message
    );
    return null;
  }
};
