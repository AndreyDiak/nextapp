"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function ratePost(
  postId: number,
  userId: number,
  alreadyLiked: boolean
) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { likedBy: true },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    const updatedLikedBy = alreadyLiked
      ? post.likedBy.filter((id) => id !== userId)
      : [...post.likedBy, userId];

    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        likedBy: updatedLikedBy,
      },
    });

    revalidatePath("/feed");
    return { success: true, post: updatedPost };
  } catch (error) {
    return { success: false, error: "Failed to rate post" };
  }
}
