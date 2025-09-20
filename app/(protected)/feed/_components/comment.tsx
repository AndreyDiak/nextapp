"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Post } from "./post_actions";

export const Comment = ({ comment }: { comment: Post["comments"][number] }) => {
  // const author = await prisma.user.findUnique({
  //   where: {
  //     id: comment.authorId,
  //   },
  // });

  return (
    <div className="flex items-center space-x-4">
      <div>{comment.content}</div>
      <div>
        <Avatar>
          <AvatarImage src={undefined} />
          <AvatarFallback className="bg-blue-100">
            {comment.author.name?.charAt(0).toUpperCase() || "?"}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
