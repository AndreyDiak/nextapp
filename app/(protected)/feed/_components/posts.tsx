import { memo } from "react";
import { CreatePost } from "./_create_post";
import { PostsList } from "./_posts_list";

export const Posts = memo(async () => {
  return (
    <div className="flex flex-col gap-4">
      <CreatePost />
      <PostsList />
    </div>
  );
});
