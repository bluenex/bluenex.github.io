import type { ExtendedRecordMap } from "notion-types";
import { NotionRenderer } from "react-notion-x";
import TwResumeLayout from "../components/TwResumeLayout";

import "react-notion-x/src/styles.css";
import { useWatchDarkMode } from "../hooks/useWatchDarkmode";

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
