import React from "react";
import { TwAvatar, TwDarkToggle, TwLink } from "../components";
import Svgs from "../components/svgs";

const Home = () => {
  return (
    <div className="min-w-screen debug-screens min-h-screen overflow-hidden bg-gray-100 py-6 text-gray-700 dark:bg-gray-800 dark:text-gray-50">
      <div className="container relative mx-auto flex flex-col items-center gap-6 py-12 px-6 sm:max-w-xl">
        {/* dark mode toggle */}
        <TwDarkToggle />

        {/* avatar */}
        <TwAvatar className="h-36 w-36" />

        {/* nav */}
        <nav className="w-full px-6">
          <ul className="mx-auto flex max-w-sm flex-col gap-2 border-b border-gray-400 pb-6 text-center">
            <li>
              <TwLink href="#">blog</TwLink>
            </li>
            <li>
              <TwLink href="https://bluenex.dev/resume">resume</TwLink>
            </li>
            <li>
              <TwLink href="https://bluenex.dev/frontend-collection">
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

          <div className="flex items-center justify-center gap-6">
            <TwLink
              href="https://github.com/bluenex"
              className="hover:scale-110 hover:duration-200"
            >
              <Svgs.GitHub className="h-8 w-8 fill-gray-600 dark:fill-gray-300" />
            </TwLink>
            <TwLink
              href="https://twitter.com/tulakann"
              className="hover:scale-110 hover:duration-200"
            >
              <Svgs.Twitter className="h-8 w-8 fill-gray-600 dark:fill-gray-300" />
            </TwLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
