import express from 'express';
import bodyParser from 'body-parser';
import cors, { CorsOptions } from 'cors';
import { PrismaClient } from '@prisma/client';
import { NODE_PORT, CORS_DOMAINS } from './config/environment';
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
    console.log('ORIGIN', { origin, whitelist });
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
app.use('/api', appRouter);

app.listen(port, () => console.info(`Server is running on port ${port}! 🚀`));
