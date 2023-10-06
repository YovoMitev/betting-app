import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export const findMany = (args: Prisma.EventFindManyArgs) =>
  prisma.event.findMany(args);
