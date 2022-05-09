import NextLink from "next/link";
import { useRouter } from "next/router";
import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  useState,
} from "react";
import staticData from "../public/static-data.json";
import TwLink from "./TwLink";

const TwButton = (
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
        <NextLink href="/blog" passHref>
          <TwLink>blog</TwLink>
        </NextLink>
        <span>•</span>
        <TwButton
          onClick={() => {
            setShowTags((p) => !p);
            if (showYears) {
              setShowYears(false);
            }
          }}
        >
          tags
        </TwButton>
        <span>•</span>
        <TwButton
          onClick={() => {
            setShowYears((p) => !p);
            if (showTags) {
              setShowTags(false);
            }
          }}
        >
          years
        </TwButton>
      </div>
      {showTags || showYears ? (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 px-6 text-sm leading-4">
          {showTags &&
            tags.map((tag, ind) => (
              <React.Fragment key={tag}>
                <TwButton
                  onClick={() => {
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { tag },
                      },
                      undefined
                    );
                  }}
                >
                  {tag}
                </TwButton>
                {ind !== tags.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
          {showYears &&
            years.map((year, ind) => (
              <React.Fragment key={year}>
                <TwButton
                  onClick={() => {
                    router.push(
                      {
                        pathname: router.pathname,
                        query: { year },
                      },
                      undefined
                    );
                  }}
                >
                  {year}
                </TwButton>
                {ind !== years.length - 1 && <span>•</span>}
              </React.Fragment>
            ))}
        </div>
      ) : null}
    </nav>
  );
};

export default TwBlogNav;
