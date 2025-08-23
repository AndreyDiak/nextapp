"use server";

import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function createUser({
  name,
  email,
  password,
}: Prisma.UserGetPayload<{
  select: {
    name: true;
    email: true;
    password: true;
  };
}>) {
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return { success: true, user };
  } catch (error) {
    return { success: false, error: "Failed to create user" };
  }
}
