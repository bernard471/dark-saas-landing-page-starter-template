import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PUT(req: Request) {
  const { userId, ...data } = await req.json()
  const user = await prisma.user.update({
    where: { id: userId },
    data
  })
  return NextResponse.json(user)
}
