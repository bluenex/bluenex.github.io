import NextLink from "next/link";
import { useRouter } from "next/router";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useState,
} from "react";
import staticData from "../public/static-data.json";
import TwLink from "./TwLink";

export const TwBlogNavButton = (
  props: DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => (
  <button
    className="text-sky-500 hover:text-sky-700 dark:text-sky-400 hover:dark:text-sky-200"
    {...props}
  />
);

const TwBlogNav = () => {
  const router = useRouter();

  const [showTags, setShowTags] = useState<boolean>(false);
  const [showYears, setShowYears] = useState<boolean>(false);

  const { tags, years } = staticData;

  return (
    <nav className="mb-4 flex flex-col">
      <div className="flex justify-center gap-2">
        <NextLink href="/blog">
          <TwLink>blog</TwLink>
        </NextLink>
        <span>•</span>
        <TwBlogNavButton
          onClick={() => {
            setShowTags((p) => !p);
            if (showYears) {
              setShowYears(false);
            }
          }}
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
                    router.push(
                      {
                        pathname: "/blog",
                        query: { tag },
                      },
                      undefined
                    );
                  }}
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
                    router.push(
                      {
                        pathname: "/blog",
                        query: { year },
                      },
                      undefined
                    );
                  }}
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
