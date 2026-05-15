import TwBlogLayout from "@/components/react/components/TwBlogLayout";
import TwBlogListItem from "@/components/react/components/TwBlogListItem";
import type { PostListItem } from "@/libs/posts";

interface BlogProps {
  filteredPosts: PostListItem[];
  tags: string[];
  years: string[];
  selectedYear: string | null;
  selectedTag: string | null;
}

const Blog = ({
  filteredPosts,
  tags,
  years,
  selectedYear,
  selectedTag,
}: BlogProps) => {
  return (
    <TwBlogLayout
      tags={tags}
      years={years}
      selectedYear={selectedYear}
      selectedTag={selectedTag}
      showYearsInitially={!selectedTag}
      showTagsInitially={!!selectedTag}
    >
      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {filteredPosts.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.id} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

export default Blog;
