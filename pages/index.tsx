import React from "react";
import { TwAvatar, TwDarkToggle, TwLink } from "../components";
import Svgs from "../components/svgs";
import NextLink from "next/link";
import TwFooter from "../components/TwFooter";
import TwLayout from "../components/TwLayout";

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
          <ul className="mx-auto flex max-w-sm flex-col gap-2 border-b border-gray-400 pb-6 text-center">
            <li>
              <NextLink href="/blog" passHref>
                <TwLink>blog</TwLink>
              </NextLink>
            </li>
            <li>
              <TwLink href="https://bluenex.dev/resume" isExternal>
                resume
              </TwLink>
            </li>
            <li>
              <TwLink href="https://bluenex.dev/frontend-collection" isExternal>
                frontend-collection
              </TwLink>
            </li>
          </ul>
        </nav>

        {/* content */}
        <div>
          <div className="mb-10 indent-4">
            <p className="mb-2">
              Hi, my name is Tulakan Ruangrong (
              <TwLink href="https://github.com/bluenex">@bluenex</TwLink>
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
