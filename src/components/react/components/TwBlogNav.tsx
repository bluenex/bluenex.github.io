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

const TwBlogNavLink = ({
  className,
  selected,
  ...restProps
}: ComponentProps<"a"> & { selected?: boolean }) => (
  <a
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
  selectedYear,
  selectedTag,
  showYearsInitially = false,
  showTagsInitially = false,
}: {
  tags: string[];
  years: string[];
  selectedYear: string | null;
  selectedTag: string | null;
  showYearsInitially?: boolean;
  showTagsInitially?: boolean;
}) => {
  const [showTags, setShowTags] = useState<boolean>(showTagsInitially);
  const [showYears, setShowYears] = useState<boolean>(
    showYearsInitially || (!showTagsInitially && !showYearsInitially),
  );

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
                <TwBlogNavLink
                  href={`/blog/year/${year}`}
                  selected={selectedYear === year}
                >
                  {year}
                </TwBlogNavLink>
                {ind !== years.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          {showTags &&
            tags.map((tag, ind) => (
              <React.Fragment key={tag}>
                <TwBlogNavLink
                  href={`/blog/tag/${tag}`}
                  selected={selectedTag === tag}
                >
                  {tag}
                </TwBlogNavLink>
                {ind !== tags.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
        </div>
      ) : null}
    </nav>
  );
};

export default TwBlogNav;
