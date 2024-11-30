import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { type ReactNode } from "react";
import { type PostListItem } from "../../../lib/posts";
import TwLink from "./TwLink";

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);
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
        <span
          className="min-w-fit"
          title={dayjs(date, "DD-MM-YYYY HH:mm").toString()}
        >
          {dayjs(date, "DD-MM-YYYY HH:mm").format("D MMM BB")}
        </span>
        {modified && (
          <span
            className="min-w-fit"
            title={dayjs(modified, "DD-MM-YYYY HH:mm").toString()}
          >
            แก้ไข: {dayjs(modified, "DD-MM-YYYY HH:mm").format("D MMM BB")}
          </span>
        )}
      </div>
    </div>
  );
};

export default TwBlogTagsDate;
