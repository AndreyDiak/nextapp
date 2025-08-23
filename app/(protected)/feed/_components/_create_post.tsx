"use client";

import { createPost } from "@/app/actions/create_post";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { memo, useCallback, useState, useTransition } from "react";

const MIN_POST_LENGTH = 10;
const MAX_POST_LENGTH = 300;

export const CreatePost = memo(() => {
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isDisabled =
    text.length < MIN_POST_LENGTH || text.length > MAX_POST_LENGTH || isPending;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      startTransition(async () => {
        const res = await createPost({
          text,
          authorId: 1,
          tags: [],
        });

        if (res?.success) {
          setText("");
        }
      });
    },
    [text, router]
  );

  return (
    <div className="border border-gray-500/30 rounded-md p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 items-end">
        <Textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нового?"
          className="flex-1"
        />
        <div className="flex gap-2 items-center">
          <span className="text-sm text-gray-500">
            {MAX_POST_LENGTH - text.length}
          </span>
          <Button type="submit" disabled={isDisabled}>
            {isPending ? "Публикация..." : "Отправить"}
          </Button>
        </div>
      </form>
    </div>
  );
});
