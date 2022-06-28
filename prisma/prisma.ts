import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function Prisma() {
  await prisma.$connect();
}
Prisma();
export { prisma as PrismaConnection };
