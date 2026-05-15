// Redirects legacy /blog?year=… and /blog?tag=… to the new path-based archives.
// Cloudflare Pages' _redirects file can't match on query strings, so this
// runs as a Pages Function at /blog and falls through to the static
// dist/blog/index.html when no query param is present.
export const onRequest = async (context) => {
  const url = new URL(context.request.url);
  const year = url.searchParams.get("year");
  const tag = url.searchParams.get("tag");

  if (year) {
    return Response.redirect(
      new URL(`/blog/year/${year}`, url.origin).toString(),
      301,
    );
  }
  if (tag) {
    return Response.redirect(
      new URL(`/blog/tag/${tag}`, url.origin).toString(),
      301,
    );
  }

  return context.next();
};
