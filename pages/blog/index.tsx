import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { TwAvatar } from "../../components";
import {
  getAllPostIds,
  getPostData,
  getPostList,
  PostData,
} from "../../lib/posts";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(buddhistEra);
dayjs.extend(customParseFormat);
dayjs.locale("th");

const Post: NextPage = ({
  postList,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  // const { title, content, builder, builder_info, links, thumbnail } = postList;
  // const reactContent = useMarkdownProcessor(content);
  console.log({ postList });

  return (
    <div className="min-w-screen debug-screens min-h-screen overflow-hidden bg-gray-800 text-gray-100">
      <div className="container mx-auto">
        <div className="flex items-center justify-center gap-4 py-6 px-2">
          <a
            href=""
            className="hover:scale-105 hover:transition-transform hover:duration-300"
          >
            <TwAvatar className="h-12 w-12" />
          </a>
          <span className="text-xl">blog</span>
        </div>

        <nav className="flex justify-center gap-2">
          <a
            href=""
            className="text-sm text-sky-400 underline underline-offset-2"
          >
            tags
          </a>
          •
          <a
            href=""
            className="text-sm text-sky-400 underline underline-offset-2"
          >
            years
          </a>
          •
          <a
            href=""
            className="text-sm text-sky-400 underline underline-offset-2"
          >
            2022
          </a>
          •
          <a
            href=""
            className="text-sm text-sky-400 underline underline-offset-2"
          >
            2021
          </a>
          •
          <a
            href=""
            className="text-sm text-sky-400 underline underline-offset-2"
          >
            2020
          </a>
        </nav>

        <div className="mx-auto flex flex-col items-start gap-4 p-4 md:max-w-2xl">
          {postList.map((post) => {
            const { title, date, tags, excerpt } = post;

            return (
              <div
                key={date}
                className="flex w-full flex-col gap-3 border-b border-b-gray-400 pb-5 last:border-b-0"
              >
                <a href="" className="flex flex-col gap-3 hover:text-sky-300">
                  <h3 className="text-2xl">{title}</h3>

                  <p>{excerpt}</p>
                </a>

                <div className="flex justify-between gap-8">
                  <div>
                    tags:{" "}
                    {tags
                      .map((tag) => {
                        return (
                          <a
                            key={tag}
                            href=""
                            className="text-sky-400 underline underline-offset-2"
                          >
                            {tag}
                          </a>
                        );
                      })
                      .reduce((prev, curr) => [prev, ", ", curr])}
                  </div>

                  <span className="min-w-fit">
                    {dayjs(date, "DD-MM-YYYY HH:mm").format("D MMM BB")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
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
