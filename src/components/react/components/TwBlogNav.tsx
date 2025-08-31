import type { PostListItem } from "@/libs/posts";
import { findLatestYearWithPosts } from "@/libs/sharedUtils";
import { useQueryState } from "nuqs";
import React, { type ComponentProps, useState } from "react";
import { twMerge } from "tailwind-merge";

export const TwBlogNavButton = ({
  className,
  selected,
  ...restProps
}: ComponentProps<"button"> & { selected?: boolean }) => (
  <button
    {...restProps}
    className={twMerge(
      "text-sky-500 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200",
      className,
      selected && "font-semibold underline underline-offset-2",
    )}
  />
);

const TwBlogNav = ({
  tags,
  years,
  allPosts,
  showYearsInitially = false,
  showTagsInitially = false,
}: {
  tags: string[];
  years: string[];
  allPosts: PostListItem[];
  showYearsInitially?: boolean;
  showTagsInitially?: boolean;
}) => {
  const [showTags, setShowTags] = useState<boolean>(showTagsInitially);
  const [showYears, setShowYears] = useState<boolean>(showYearsInitially);

  const [selectedTag, setSelectedTag] = useQueryState("tag");
  const [selectedYear, setSelectedYear] = useQueryState("year");

  // Set default navigation state - always show years if nothing is showing
  React.useEffect(() => {
    if (!showTags && !showYears) {
      setShowYears(true);
    }
  }, [showTags, showYears]);

  return (
    <nav className="mb-4 flex flex-col">
      <div className="flex justify-center gap-2">
        <TwBlogNavButton
          onClick={() => {
            if (showYears) {
              // If years are already showing, only hide if tags will show
              if (!showTags) {
                // Don't allow hiding years if tags aren't showing
                return;
              }
            }
            setShowYears(!showYears);

            if (!showYears) {
              // Hide tags when showing years
              setShowTags(false);
            }
          }}
          selected={showYears}
        >
          years
        </TwBlogNavButton>
        <span>•</span>
        <TwBlogNavButton
          onClick={() => {
            setShowTags(!showTags);
            if (!showTags) {
              // Hide years when showing tags
              setShowYears(false);
            } else {
              // Show years when hiding tags (default state)
              setShowYears(true);
            }
          }}
          selected={showTags}
        >
          tags
        </TwBlogNavButton>
      </div>
      {showTags || showYears ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-6 text-sm leading-4">
          {showYears &&
            years.map((year, ind) => (
              <React.Fragment key={year}>
                <TwBlogNavButton
                  onClick={() => {
                    // more interactiveness on the blog page
                    if (window.location.pathname === "/blog") {
                      if (year === selectedYear) {
                        // If clicking the same year, go to latest year instead of clearing
                        const latestYear = findLatestYearWithPosts(
                          years,
                          allPosts,
                        );
                        setSelectedYear(latestYear);
                      } else {
                        // If clicking different year, select it
                        setSelectedYear(year);
                      }

                      // Clear tag selection when selecting a year
                      setSelectedTag(null);
                    } else {
                      window.location.href = `/blog?year=${year}`;
                    }
                  }}
                  selected={selectedYear === year}
                >
                  {year}
                </TwBlogNavButton>
                {ind !== years.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          {showTags &&
            tags.map((tag, ind) => (
              <React.Fragment key={tag}>
                <TwBlogNavButton
                  onClick={() => {
                    // more interactiveness on the blog page
                    if (window.location.pathname === "/blog") {
                      if (tag === selectedTag) {
                        // If clicking the same tag, go to latest year instead of clearing
                        const latestYear = findLatestYearWithPosts(
                          years,
                          allPosts,
                        );
                        setSelectedYear(latestYear);
                        setSelectedTag(null);
                        // Hide tags and show years
                        setShowYears(true);
                        setShowTags(false);
                      } else {
                        // If clicking different tag, select it
                        setSelectedTag(tag);
                        // Clear year selection when selecting a tag
                        setSelectedYear(null);
                      }
                    } else {
                      window.location.href = `/blog?tag=${tag}`;
                    }
                  }}
                  selected={selectedTag === tag}
                >
                  {tag}
                </TwBlogNavButton>
                {ind !== tags.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
        </div>
      ) : null}
    </nav>
  );
};

export default TwBlogNav;
