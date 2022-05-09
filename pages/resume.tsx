import { GetStaticProps, NextPage } from "next";
import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";
import { useContext } from "react";
import { NotionRenderer } from "react-notion-x";
import TwResumeLayout from "../components/TwResumeLayout";
import { ThemeContext } from "../contexts/theme";

const Resume: NextPage<{ recordMap: ExtendedRecordMap }> = ({ recordMap }) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <TwResumeLayout>
      {darkMode !== null && (
        <NotionRenderer
          recordMap={recordMap}
          fullPage={true}
          darkMode={darkMode!}
        />
      )}
    </TwResumeLayout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const notion = new NotionAPI();
  const recordMap = await notion.getPage("879d3cc457ad4a128bcae5f731ebf5c7");

  return {
    props: {
      recordMap,
    },
  };
};

export default Resume;
