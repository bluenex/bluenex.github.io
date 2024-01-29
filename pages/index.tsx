import NextLink from "next/link";
import React, { Fragment } from "react";
import TwAvatar from "../components/TwAvatar";
import TwDarkToggle from "../components/TwDarkToggle";
import TwFooter from "../components/TwFooter";
import TwLayout from "../components/TwLayout";
import TwLink from "../components/TwLink";

const links = [
  {
    url: "/blog",
    text: "Blog",
  },
  {
    url: "https://apps.bluenex.dev",
    text: "Apps",
    isExternal: true,
  },
  {
    url: "/resume",
    text: "Resume",
  },
];

const Home = () => {
  return (
    <TwLayout className="py-6">
      <div className="container relative mx-auto flex flex-col items-center gap-6 py-12 px-6 sm:max-w-xl">
        {/* dark mode toggle */}
        <TwDarkToggle className="absolute top-4 right-4" />

        {/* avatar */}
        <TwAvatar className="h-36 w-36" />

        {/* nav */}
        <nav className="w-full px-6">
          <ul className="mx-auto flex max-w-sm flex-wrap justify-center gap-2 border-b border-gray-400 pb-6">
            {links.map((x, ind) => (
              <Fragment key={x.text}>
                <li className="mx-1">
                  {x.isExternal ? (
                    <TwLink href={x.url} asExternalLink>
                      {x.text}
                    </TwLink>
                  ) : (
                    <NextLink href={x.url}>
                      <TwLink>{x.text}</TwLink>
                    </NextLink>
                  )}
                </li>
              </Fragment>
            ))}
          </ul>
        </nav>

        {/* content */}
        <div>
          <div className="mb-10 indent-4">
            <p className="mb-2">
              Hi, my name is Tulakan Ruangrong (
              <TwLink href="https://github.com/bluenex" asExternalLink>
                @bluenex
              </TwLink>
              ), a software developer based in Bangkok, Thailand.
            </p>
            <p>
              This is my personal website which is obviously not very fancy. I
              start learning Tailwind CSS not long ago and think that this is a
              good opportunity to rewrite my personal website along the learning
              process. And yes, it is this website.
            </p>
          </div>

          <TwFooter />
        </div>
      </div>
    </TwLayout>
  );
};

export default Home;
