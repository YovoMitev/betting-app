import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserService } from '../../modules/users';

interface ISession {
  id: number;
  email: string;
}

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email: string, password: string, done) => {
      try {
        const user = await UserService.authenticate({ email, password });
        if (!user) {
          return done(null, false, { message: 'Incorrect credentials.' });
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser(async (session: ISession, done) => {
  try {
    const user = await UserService.getById(session.id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

export default passport;
