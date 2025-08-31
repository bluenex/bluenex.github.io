import TwBlogLayout from "@/components/react/components/TwBlogLayout";
import TwBlogListItem from "@/components/react/components/TwBlogListItem";
import type { PostListItem } from "@/libs/posts";
import { findLatestYearWithPosts } from "@/libs/sharedUtils";
import { useQueryState } from "nuqs";
import { NuqsAdapter } from "nuqs/adapters/react";
import { useEffect, useState } from "react";

interface BlogProps {
  allPosts: PostListItem[];
  tags: string[];
  years: string[];
}

const Blog = ({ allPosts, tags, years }: BlogProps) => {
  const [filteredPosts, setFilteredPosts] = useState<PostListItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);
  const [queryTag, setQueryTag] = useQueryState("tag");
  const [queryYear, setQueryYear] = useQueryState("year");

  // Initialize with latest year if no query params
  useEffect(() => {
    if (!queryTag && !queryYear && !isInitialized) {
      const latestYear = findLatestYearWithPosts(years, allPosts);
      setQueryYear(latestYear);
      setIsInitialized(true);
    } else if ((queryTag || queryYear) && !isInitialized) {
      setIsInitialized(true);
    }
  }, [queryTag, queryYear, years, allPosts, isInitialized, setQueryYear]);

  // Filter posts based on query params
  useEffect(() => {
    if (!isInitialized) {
      setFilteredPosts([]); // Keep empty until initialized
      return;
    }

    if (!queryTag && !queryYear) {
      setFilteredPosts(allPosts);
      return;
    }

    // We don't support this scenario anymore
    if (queryTag && queryYear) {
      const filtered = allPosts.filter((post) => {
        return post.tags?.includes(queryTag) && post.year === queryYear;
      });
      setFilteredPosts(filtered);
      return;
    }

    if (queryTag) {
      const filtered = allPosts.filter((post) => {
        return post.tags?.includes(queryTag);
      });
      setFilteredPosts(filtered);
      return;
    }

    if (queryYear) {
      const filtered = allPosts.filter((post) => {
        return post.year === queryYear;
      });
      setFilteredPosts(filtered);
      return;
    }
  }, [queryTag, queryYear, allPosts, isInitialized]);

  return (
    <TwBlogLayout
      tags={tags}
      years={years}
      allPosts={allPosts}
      showYearsInitially={!!queryYear && !queryTag}
      showTagsInitially={!!queryTag && !queryYear}
    >
      {/* posts list */}
      <div className="flex flex-col items-start gap-6">
        {filteredPosts.map((postItemData: PostListItem) => (
          <TwBlogListItem itemData={postItemData} key={postItemData.date} />
        ))}
      </div>
    </TwBlogLayout>
  );
};

const BlogWrapper = ({ allPosts, tags, years }: BlogProps) => {
  return (
    <NuqsAdapter>
      <Blog allPosts={allPosts} tags={tags} years={years} />
    </NuqsAdapter>
  );
};

export default BlogWrapper;
