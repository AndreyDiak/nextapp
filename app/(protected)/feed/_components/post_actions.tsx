"use client";

import { commentPost } from "@/app/actions/comment_post";
import { getPosts } from "@/app/actions/get_posts";
import { ratePost } from "@/app/actions/rate_post";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Heart, MessageSquareMore } from "lucide-react";
import { useState, useTransition } from "react";
import { Comment } from "./comment";

export type Post = Awaited<ReturnType<typeof getPosts>>["posts"][number];

type PostActionsProps = {
  post: Post;
  userId: number;
};

export const PostActions = ({ post, userId }: PostActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [isPending, startTransition] = useTransition();

  const isDisabled = comment.length === 0 || isPending;

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const handleComment = () => {
    startTransition(async () => {
      await commentPost(post.id, comment, userId);
      setComment("");
    });
  };

  return (
    <div className="flex flex-col gap-4 flex-1">
      <div className="flex items-center space-x-4">
        <LikeButton post={post} userId={userId} />
        <CommentButton
          post={post}
          handleToggle={toggleAccordion}
          isOpen={isOpen}
        />
      </div>
      <Accordion
        type="single"
        collapsible
        value={isOpen ? "comments" : ""}
        onValueChange={(value) => setIsOpen(value === "comments")}
      >
        <AccordionItem value="comments">
          <AccordionContent className="flex flex-col gap-2 items-end">
            <div className="flex flex-col gap-2 items-end">
              {post.comments.map((comment) => (
                <Comment key={comment.id} comment={comment} />
              ))}
            </div>
            <Textarea
              placeholder="Комментировать..."
              className="flex-1"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Button onClick={handleComment} disabled={isDisabled}>
              Отправить
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

const LikeButton = ({ post, userId }: { post: Post; userId: number }) => {
  const [isPending, startTransition] = useTransition();
  const alreadyLiked = post.likedBy.includes(userId);

  const handleLike = () => {
    startTransition(async () => {
      await ratePost(post.id, userId, alreadyLiked);
    });
  };

  return (
    <button
      className={cn(
        "flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors",
        isPending && "opacity-50 cursor-not-allowed"
      )}
      onClick={handleLike}
      disabled={isPending}
    >
      <Heart strokeWidth={2} className={cn(alreadyLiked && "text-red-500")} />
      <span
        className={cn(alreadyLiked && "text-red-500", "font-medium text-lg")}
      >
        {post.likedBy.length}
      </span>
    </button>
  );
};

const CommentButton = ({
  post,
  isOpen,
  handleToggle,
}: {
  post: Post;
  isOpen: boolean;
  handleToggle: () => void;
}) => {
  return (
    <div>
      <button
        onClick={handleToggle}
        className="flex items-center space-x-1 text-gray-500 cursor-pointer hover:text-blue-600 transition-colors"
      >
        <MessageSquareMore
          strokeWidth={2}
          className={cn(isOpen && "text-blue-500")}
        />
        <span className={cn(isOpen && "text-blue-500", "font-medium text-lg")}>
          {post.comments.length}
        </span>
      </button>
    </div>
  );
};
