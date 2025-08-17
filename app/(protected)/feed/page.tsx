import { Tags } from "./_components/_tags";
import { Posts } from "./_components/posts";

export default function Feed() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
      <Posts />
      <Tags />
    </div>
  );
}
