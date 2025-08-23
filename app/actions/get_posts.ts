"use server";

import { prisma } from "@/lib/prisma";

export async function getPosts() {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        tags: {
          select: {
            id: true,
            name: true,
          },
        },
        comments: {
          select: {
            id: true,
            content: true,
            createdAt: true,
            author: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
        _count: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, posts };
  } catch (error) {
    return { success: false, posts: [], error: "Error fetching posts" };
  }
}
