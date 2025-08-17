"use server";

import { Prisma } from "@/lib/generated/prisma";
import { prisma } from "@/lib/prisma";

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
  return await prisma.post.create({
    data: {
      text,
      authorId,
      tags: {
        connect: tags.map((tag) => ({ id: tag.id })),
      },
    },
  });
}
