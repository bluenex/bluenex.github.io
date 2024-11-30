import type { PostListItem } from "../../lib/posts";
import TwBlogTagsDate from "./TwBlogTagsDate";
import TwLink from "./TwLink";

const TwBlogListItem = ({ itemData }: { itemData: PostListItem }) => {
  const { id, title, excerpt } = itemData;

  return (
    <div
      key={id}
      className="flex w-full flex-col gap-3 border-b border-b-gray-400 pb-6 last:border-b-0"
    >
      <TwLink
        href={`/blog/${id}`}
        className="flex flex-col gap-3 hover:text-sky-500 hover:dark:text-sky-300"
      >
        <h3 className="text-2xl font-semibold">{title}</h3>
        <p>{excerpt}</p>
      </TwLink>

      <TwBlogTagsDate itemData={itemData} />
    </div>
  );
};

export default TwBlogListItem;
