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

const TwBlogTagsDate = ({ itemData }: { itemData: PostListItem }) => {
  const { date, tags } = itemData;

  return (
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
  );
};

export default TwBlogTagsDate;
