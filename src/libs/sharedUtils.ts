import type { PostListItem } from "./posts";

export function findLatestYearWithPosts(
  years: string[],
  allPosts: PostListItem[],
) {
  const currentYear = new Date().getFullYear();
  for (
    let year = currentYear;
    year >= parseInt(years[years.length - 1]);
    year--
  ) {
    const postsInYear = allPosts.filter(
      (post) => post.year === year.toString(),
    );
    if (postsInYear.length > 0) {
      return year.toString();
    }
  }
  return years[0]; // fallback to the latest year in the list
}
