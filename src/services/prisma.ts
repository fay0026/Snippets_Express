import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'postgresql://mr513:password@127.0.0.1:5432/snippets',
    },
  },
})

export default prisma;