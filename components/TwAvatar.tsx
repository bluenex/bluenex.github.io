import Image from "next/image";
import { DetailedHTMLProps, HTMLAttributes } from "react";

const TwAvatar = (
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) => {
  // currently, this is used to control size of the container only
  const { className = "" } = props;

  return (
    <div
      className={`overflow-hidden rounded-full border-2 border-sky-500 hover:scale-105 hover:transition-transform hover:duration-300 dark:border-sky-400 ${className}`}
    >
      <Image
        layout="responsive"
        width={144}
        height={144}
        src="https://avatars.githubusercontent.com/u/11027706?v=4"
        alt="avatar"
      />
    </div>
  );
};

export default TwAvatar;
