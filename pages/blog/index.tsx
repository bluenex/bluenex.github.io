import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import customParseFormat from "dayjs/plugin/customParseFormat";
import type { GetStaticProps, InferGetStaticPropsType, NextPage } from "next";
import { ReactNode } from "react";
import { TwLink } from "../../components";
import TwBlogLayout from "../../components/TwBlogLayout";
import { getPostList } from "../../lib/posts";

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);
dayjs.locale("th");

const Post: NextPage = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <TwBlogLayout>
      {/* nav */}
      <nav className="mb-4 flex justify-center gap-2 text-sm">
        <TwLink href="">tags</TwLink>•<TwLink href="">years</TwLink>•
        <TwLink href="">2022</TwLink>•<TwLink href="">2021</TwLink>•
        <TwLink href="">2020</TwLink>
      </nav>

      {/* posts list */}
      <div className="flex flex-col items-start gap-4 ">
        {postList.map(
          (post: {
            title: string;
            date: string;
            tags: string[];
            excerpt: string;
          }) => {
            const { title, date, tags, excerpt } = post;

            return (
              <div
                key={date}
                className="flex w-full flex-col gap-3 border-b border-b-gray-400 pb-5 last:border-b-0"
              >
                <a
                  href=""
                  className="flex flex-col gap-3 hover:text-sky-500 hover:dark:text-sky-300"
                >
                  <h3 className="text-2xl font-semibold">{title}</h3>

                  <p>{excerpt}</p>
                </a>

                <div className="flex justify-between gap-8">
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
                        (prev, curr) => [prev, ", ", curr],
                        undefined
                      )}
                  </div>

                  <span className="min-w-fit">
                    {dayjs(date, "DD-MM-YYYY HH:mm").format("D MMM BB")}
                  </span>
                </div>
              </div>
            );
          }
        )}
      </div>
    </TwBlogLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const postList = getPostList();

  return {
    props: {
      postList,
    },
  };
};

export default Post;
