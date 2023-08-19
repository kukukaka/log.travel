import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Notice the funciton definiton:
export async function GET(req) {
  return NextResponse.json(
    { error: "Method not allowed" },
    {
      status: 405
    }
  );
}

// Notice the funciton definiton:
export async function POST(req) {
    const data = await req.json()

  try {
    const entry = await prisma.tripEntry.create({
                 data
              });

    return NextResponse.json(entry, {
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get admins" },
      {
        status: 500,
      }
    );
  }
}