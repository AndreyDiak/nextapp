import { getCurrentUserId } from "@/app/actions/auth";
import { getPosts } from "@/app/actions/get_posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DateDisplay } from "@/components/ui/date-display";
import { memo } from "react";
import { PostActions } from "./post_actions";

export const PostsList = memo(async () => {
  const { posts } = await getPosts();
  const userId = await getCurrentUserId();

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Avatar>
                <AvatarImage src={undefined} />
                <AvatarFallback>
                  {post.author.name?.charAt(0).toUpperCase() || "?"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium text-gray-900">
                  {post.author.name}
                </h3>
                <DateDisplay
                  date={post.createdAt}
                  className="text-xs text-gray-500"
                />
              </div>
            </div>
          </header>
          <div className="mb-4">
            <p className="text-gray-800 whitespace-pre-wrap">{post.text}</p>
          </div>
          {post.tags.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
            <PostActions post={post} userId={userId} />
          </footer>
        </article>
      ))}
    </div>
  );
});
