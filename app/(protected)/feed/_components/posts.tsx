import { memo } from "react";
import { CreatePost } from "./_create_post";

export const Posts = memo(async () => {
  return (
    <div>
      <CreatePost />
    </div>
  );
});
