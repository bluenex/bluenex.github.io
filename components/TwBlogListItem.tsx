import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { ReactNode } from "react";
import { PostListItem } from "../lib/posts";
import TwLink from "./TwLink";

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);
dayjs.locale("th");

const TwBlogListItem = ({ itemData }: { itemData: PostListItem }) => {
  const { title, date, tags, excerpt } = itemData;

  return (
    <div
      key={date}
      className="flex w-full flex-col gap-3 border-b border-b-gray-400 pb-6 last:border-b-0"
    >
      <a
        href=""
        className="flex flex-col gap-3 hover:text-sky-500 hover:dark:text-sky-300"
      >
        <h3 className="text-2xl font-semibold">{title}</h3>

        <p>{excerpt}</p>
      </a>

      <div className="flex justify-between gap-8">
        {Array.isArray(tags) && tags.length > 0 ? (
          <div>
            tags:{" "}
            {tags
              .map((tag) => {
                return (
                  <TwLink key={tag} href="">
                    {tag}
                  </TwLink>
                );
              })
              .reduce<ReactNode>(
                (prev, curr) => (prev ? [prev, ", ", curr] : [curr]),
                undefined
              )}
          </div>
        ) : (
          <div />
        )}

        <span
          className="min-w-fit"
          title={dayjs(date, "DD-MM-YYYY HH:mm").toString()}
        >
          {dayjs(date, "DD-MM-YYYY HH:mm").format("D MMM BB")}
        </span>
      </div>
    </div>
  );
};

export default TwBlogListItem;
