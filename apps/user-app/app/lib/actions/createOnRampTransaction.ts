"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function AddMoneyHandler(amount: string, provider: string) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const txn = await prisma.onRampTransaction.create({
    data: {
      userId: Number(userId),
      amount: Number(amount)*100,
      status: "Processing",
      startTime: new Date(),
      provider: provider,
      token: (Math.random() * 1000).toString(),
    },
  });

  return {
    message: "On Ramp Transaction Added",
  };
}
