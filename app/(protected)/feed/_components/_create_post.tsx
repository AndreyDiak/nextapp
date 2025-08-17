"use client";
import { createPost } from "@/app/actions/create_post";
import { Button } from "@/components/ui/button";
import { memo, useCallback, useState } from "react";

export const CreatePost = memo(() => {
  const [text, setText] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      await createPost({
        text,
        authorId: 1,
        tags: [],
      });
    },
    [text]
  );

  return (
    <div className="border border-gray-500/30 rounded-md p-4">
      <form onSubmit={handleSubmit}>
        <textarea
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Что нового?"
          className="flex-1"
        />
        <Button type="submit">Отправить</Button>
      </form>
    </div>
  );
});
