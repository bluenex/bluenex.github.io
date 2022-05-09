const { readFileSync, writeFileSync } = require("fs");
const { glob } = require("glob");
const matter = require("gray-matter");
const path = require("path");

/**
 * @description All Tags and Years in all posts are included in the public/static-data.json.
 * The file is generated on dev-server startup. There is no any other easy ways other than
 * the getStaticProps() in NextJS, but we need to call in every page which is tedious.
 * And this data would not change that often, so make it static data file should be good.
 */

const postsDirectory = path.join(process.cwd(), "posts");

function getAllYears() {
  const fileNames = glob.sync(`${postsDirectory}/**/*.md`);
  const years = new Set();

  fileNames.forEach((fileName) => {
    const [year] = fileName.split("/").slice(-1)[0].split("-");
    years.add(year);
  });

  return Array.from(years).sort((a, b) => Number(b) - Number(a));
}

function getAllTags() {
  const fileNames = glob.sync(`${postsDirectory}/**/*.md`);
  const tags = new Set();

  fileNames.forEach((fileName) => {
    const [id] = fileName.split("/").slice(-1);
    const filePath = path.join(postsDirectory, id);
    const fileContents = readFileSync(filePath, "utf8");

    const matterResult = matter(fileContents);

    matterResult.data.tags.forEach((tag) => {
      tags.add(tag);
    });
  });

  return Array.from(tags).sort();
}

const allYears = getAllYears();
const allTags = getAllTags();

const data = { years: allYears, tags: allTags };

const staticDataDirectory = path.join(
  process.cwd(),
  "public",
  "static-data.json"
);

writeFileSync(staticDataDirectory, JSON.stringify(data, null, 2));
