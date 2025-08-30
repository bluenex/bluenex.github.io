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
  initialYear = null,
  initialTag = null,
}: {
  tags: string[];
  years: string[];
  allPosts: PostListItem[];
  showYearsInitially?: boolean;
  showTagsInitially?: boolean;
  initialYear?: string | null;
  initialTag?: string | null;
}) => {
  const [showTags, setShowTags] = useState<boolean>(showTagsInitially);
  const [showYears, setShowYears] = useState<boolean>(showYearsInitially);

  const [selectedTag, setSelectedTag] = useQueryState("tag");
  const [selectedYear, setSelectedYear] = useQueryState("year");

  // Use initial values if the query state hasn't synced yet
  const currentYear = selectedYear || initialYear;
  const currentTag = selectedTag || initialTag;

  return (
    <nav className="mb-4 flex flex-col">
      <div className="flex justify-center gap-2">
        <TwBlogNavButton
          onClick={() => {
            // Only allow collapsing years if tags are showing
            // If years are already expanded and tags are not showing, do nothing
            if (showYears && !showTags) {
              return; // Do nothing when years are expanded and tags are not showing
            }

            const willShowYears = !showYears;
            setShowYears(willShowYears);
            if (willShowYears && showTags) {
              // If expanding years and tags are showing, collapse tags
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
            const willShowTags = !showTags;
            setShowTags(willShowTags);
            if (willShowTags) {
              // If expanding tags, collapse years
              setShowYears(false);
            } else {
              // If collapsing tags, expand years (default state)
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
                      if (year === currentYear) {
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
                  selected={currentYear === year}
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
                      const newTag =
                        tag === (selectedTag || currentTag) ? null : tag;
                      setSelectedTag(newTag);

                      // Clear year selection when selecting a tag
                      if (newTag !== null) {
                        setSelectedYear(null);
                      }
                    } else {
                      window.location.href = `/blog?tag=${tag}`;
                    }
                  }}
                  selected={currentTag === tag}
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
