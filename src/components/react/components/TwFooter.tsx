import Svgs from "@/components/react/svgs";
import TwLink from "./TwLink";

const TwFooter = () => {
  return (
    <div className="flex items-center justify-center gap-6">
      <TwLink
        href="https://github.com/bluenex"
        className="hover:scale-110 hover:duration-200"
        asExternalLink
      >
        <Svgs.GitHub className="h-8 w-8 fill-gray-600 dark:fill-gray-300" />
      </TwLink>
      <TwLink
        href="https://twitter.com/tulakann"
        className="hover:scale-110 hover:duration-200"
        asExternalLink
      >
        <Svgs.Twitter className="h-8 w-8 fill-gray-600 dark:fill-gray-300" />
      </TwLink>
    </div>
  );
};

export default TwFooter;
