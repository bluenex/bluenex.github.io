import React, { type ComponentProps, useEffect, useState } from "react";
import TwLink from "./TwLink";
import { useQueryState } from "nuqs";
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
      selected && "underline underline-offset-2 font-semibold",
    )}
  />
);

const TwBlogNav = ({ tags, years }: { tags: string[]; years: string[] }) => {
  const [showTags, setShowTags] = useState<boolean>(false);
  const [showYears, setShowYears] = useState<boolean>(false);

  const [selectedTag, setSelectedTag] = useQueryState("tag");
  const [selectedYear, setSelectedYear] = useQueryState("year");

  return (
    <nav className="mb-4 flex flex-col">
      <div className="flex justify-center gap-2">
        <TwLink href="/blog">blog</TwLink>

        <span>•</span>
        <TwBlogNavButton
          onClick={() => {
            setShowTags((p) => !p);
            if (showYears) {
              setShowYears(false);
            }
          }}
          selected={showTags}
        >
          tags
        </TwBlogNavButton>
        <span>•</span>
        <TwBlogNavButton
          onClick={() => {
            setShowYears((p) => !p);
            if (showTags) {
              setShowTags(false);
            }
          }}
          selected={showYears}
        >
          years
        </TwBlogNavButton>
      </div>
      {showTags || showYears ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-6 text-sm leading-4">
          {showTags &&
            tags.map((tag, ind) => (
              <React.Fragment key={tag}>
                <TwBlogNavButton
                  onClick={() => {
                    setSelectedTag((old) => (tag === old ? null : tag));
                  }}
                  selected={selectedTag === tag}
                >
                  {tag}
                </TwBlogNavButton>
                {ind !== tags.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          {showYears &&
            years.map((year, ind) => (
              <React.Fragment key={year}>
                <TwBlogNavButton
                  onClick={() => {
                    setSelectedYear((old) => (year === old ? null : year));
                  }}
                  selected={selectedYear === year}
                >
                  {year}
                </TwBlogNavButton>
                {ind !== years.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
        </div>
      ) : null}
    </nav>
  );
};

export default TwBlogNav;
