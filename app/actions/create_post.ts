"use server";

import { Prisma } from "@/lib/generated/prisma";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createPost({
  text,
  authorId,
  tags,
}: Prisma.PostGetPayload<{
  select: {
    text: true;
    authorId: true;
    tags: true;
  };
}>) {
  try {
    const post = await prisma.post.create({
      data: {
        text,
        authorId,
        tags: {
          connect: tags.map((tag) => ({ id: tag.id })),
        },
      },
    });
    revalidatePath("/feed");
    return { success: true, post };
  } catch (error) {
    return { success: false, error: "Failed to create post" };
  }
}
