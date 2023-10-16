import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const create = (payload: {
  password: string;
  email: string;
  salt: string;
}) => prisma.user.create({ data: payload });

export const getByEmail = (email: string) =>
  prisma.user.findUnique({
    where: {
      email,
    },
  });
