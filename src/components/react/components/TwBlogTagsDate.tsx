import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import type { ReactNode } from "react";
import TwLink from "./TwLink";
import type { PostListItem } from "@/libs/posts";

dayjs.extend(buddhistEra);
dayjs.locale("th");

const TwBlogTagsDate = ({ itemData }: { itemData: PostListItem }) => {
  const { date, tags, modified } = itemData;

  return (
    <div className="flex items-center justify-between gap-8">
      {Array.isArray(tags) && tags.length > 0 ? (
        <div>
          tags:{" "}
          {tags
            .map((tag) => {
              return (
                <TwLink href={`/blog?tag=${tag}`} key={tag}>
                  {tag}
                </TwLink>
              );
            })
            .reduce<ReactNode>(
              (prev, curr) => (prev ? [prev, ", ", curr] : [curr]),
              undefined,
            )}
        </div>
      ) : (
        <div />
      )}

      <div className="flex flex-col items-end">
        <span className="min-w-fit" title={dayjs(date).toString()}>
          {dayjs(date).format("D MMM BB")}
        </span>
        {modified && (
          <span className="min-w-fit" title={dayjs(modified).toString()}>
            แก้ไข: {dayjs(modified).format("D MMM BB")}
          </span>
        )}
      </div>
    </div>
  );
};

export default TwBlogTagsDate;
