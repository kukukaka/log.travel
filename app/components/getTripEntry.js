import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function getTripEntry() {
    const tripEntry = await prisma.TripEntry.findMany({orderBy: [{ date: 'asc'}]})
    return tripEntry
  }

