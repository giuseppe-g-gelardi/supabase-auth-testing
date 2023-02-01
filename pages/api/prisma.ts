import prisma from "@/lib/prisma";
import type { NextApiRequest as Request, NextApiResponse as Response } from 'next'


export default async function handler(req: Request, res: Response) {
  const allUsers = await prisma.user.findMany()
  console.log(allUsers)

  await prisma.test.create({
    data: {
      message: 'POOP'
    }
  })

  const t = await prisma.test.findMany()


  res.status(200).json(t)
}
