import { PrismaClient } from '@prisma/client'
import { Prisma } from '@prisma/client'
declare global { var prisma: PrismaClient | undefined }
export const db = global.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.prisma = db
export const money = (value: Prisma.Decimal | number) => Number(value).toFixed(2)
