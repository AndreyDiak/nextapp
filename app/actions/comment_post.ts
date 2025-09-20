"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function commentPost(
  postId: number,
  content: string,
  authorId: number
) {
  try {
    const comment = await prisma.comment.create({
      data: { postId, content, authorId },
    });
    revalidatePath("/feed");
    return { success: true, comment };
  } catch (error) {
    return { success: false, error: "Failed to comment post" };
  }
}
