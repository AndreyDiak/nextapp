"use server";

import { getAuthSession } from "@/lib/auth-server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletePost(postId: number) {
  try {
    const session = await getAuthSession();
    if (!session?.user) {
      return { success: false, error: "Not authenticated" };
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) {
      return { success: false, error: "Post not found" };
    }

    if (post.authorId !== parseInt(session.user!.id)) {
      return { success: false, error: "Access denied" };
    }

    await prisma.post.delete({
      where: { id: postId },
    });

    revalidatePath("/feed");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to delete post" };
  }
}
