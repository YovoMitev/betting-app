import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from './config/passport';
import cors, { CorsOptions } from 'cors';
import { PrismaClient } from '@prisma/client';
import { NODE_PORT, CORS_DOMAINS, SESSION_SECRET } from './config/environment';
import appRouter from './router';

const app = express();
const port = NODE_PORT || 3000;

/** Handle Prisma connection errors */
(async () => {
  try {
    const prisma = new PrismaClient();
    await prisma.$connect();
    console.log('Prisma was connected successfully! 🚀🚀🚀');
    return prisma.$disconnect();
  } catch (err) {
    console.log(
      'An error occurred while trying to establish a Prisma connection.',
      err
    );
    return process.exit(1);
  }
})();

const whitelist = CORS_DOMAINS?.split(',').map((item) => item.trim());
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || whitelist?.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  session({ secret: SESSION_SECRET, resave: false, saveUninitialized: false })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/api', appRouter);
app.listen(port, () => console.info(`Server is running on port ${port}! 🚀`));
