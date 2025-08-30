import { Fragment } from "react";
import TwAvatar from "../components/TwAvatar";
import TwFooter from "../components/TwFooter";
import TwLayout from "../components/TwLayout";
import TwLink from "../components/TwLink";

const links = [
  {
    url: "/blog",
    text: "Blog",
  },
  {
    url: "/resume",
    text: "Resume",
  },
  {
    url: "https://apps.bluenex.dev",
    text: "Apps",
    isExternal: true,
  },
];

const Home = () => {
  return (
    <TwLayout className="py-6">
      <div className="container relative mx-auto flex flex-col items-center gap-6 px-6 py-12 sm:max-w-xl">
        {/* avatar */}
        <TwAvatar className="h-36 w-36" />

        {/* nav */}
        <nav className="w-full px-6">
          <ul className="mx-auto flex max-w-sm flex-wrap justify-center gap-2 border-b border-gray-400 pb-6">
            {links.map((x) => (
              <Fragment key={x.text}>
                <li className="mx-1">
                  <TwLink href={x.url} asExternalLink={x.isExternal}>
                    {x.text}
                  </TwLink>
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
              I started my journey in Zoology and Biomedical Engineering, and
              now I'm focused on solving problems, fostering collaboration, and
              continuously learning in the world of tech.
            </p>
          </div>

          <TwFooter />
        </div>
      </div>
    </TwLayout>
  );
};

export default Home;
