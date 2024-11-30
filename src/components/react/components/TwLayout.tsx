import { type ComponentProps } from "react";

const TwLayout = (props: ComponentProps<"div">) => {
  const { className = "", ...restProps } = props;

  return (
    <div
      className={`min-w-screen debug-screens min-h-screen overflow-hidden bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-50 ${className}`}
      {...restProps}
    />
  );
};

export default TwLayout;
