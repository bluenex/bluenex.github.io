import NextLink from "next/link";
import TwLink from "./TwLink";

const TwBlogNav = () => {
  return (
    <nav className="mb-4 flex justify-center gap-2 text-sm">
      <NextLink href="/blog" passHref>
        <TwLink>blog</TwLink>
      </NextLink>
      <span>•</span>
      <TwLink href="">tags</TwLink>
      <span>•</span>
      <TwLink href="">years</TwLink>
      <span>•</span>
      <TwLink href="">2022</TwLink>
      <span>•</span>
      <TwLink href="">2021</TwLink>
    </nav>
  );
};

export default TwBlogNav;
