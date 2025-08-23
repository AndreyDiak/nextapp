import { getPosts } from "@/app/actions/get_posts";
import { Heart, MessageSquareMore } from "lucide-react";
import { memo } from "react";

export const PostsList = memo(async () => {
  const { posts } = await getPosts();

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
        >
          {/* Заголовок поста с автором */}
          <header className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {post.author.name?.charAt(0).toUpperCase() || "?"}
              </div>
              <div>
                <p className="font-medium text-gray-900">{post.author.name}</p>
                <p>
                  {new Intl.DateTimeFormat("ru-RU", {
                    day: "numeric",
                    month: "long",
                    hour: "2-digit",
                    minute: "2-digit",
                  }).format(new Date(post.createdAt))}
                </p>
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

          {/* Футер с действиями */}
          <footer className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                <Heart strokeWidth={1} />
                <span>{post.likesCount}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors">
                <MessageSquareMore strokeWidth={1} />
                <span>{post._count.comments}</span>
              </button>
            </div>
          </footer>
        </article>
      ))}
    </div>
  );
});
