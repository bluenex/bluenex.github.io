import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import TwResumeLayout from "../components/TwResumeLayout";
import { useWatchDarkMode } from "../hooks/useWatchDarkMode";
import "react-notion-x/src/styles.css";

type ResumeProps = {
  recordMap: ExtendedRecordMap;
};

const Resume = ({ recordMap }: ResumeProps) => {
  const isDarkMode = useWatchDarkMode();

  return (
    <TwResumeLayout>
      <NotionRenderer
        recordMap={recordMap}
        fullPage={true}
        darkMode={isDarkMode}
      />
    </TwResumeLayout>
  );
};

export default Resume;
