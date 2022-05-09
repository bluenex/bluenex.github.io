import { Head, Html, Main, NextScript } from "next/document";
import { GA_TRACKING_ID } from "../lib/gtag";

const isProduction = process.env.NODE_ENV === "production";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* only run gtag script in production */}
        {isProduction && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${GA_TRACKING_ID}', {
    page_path: window.location.pathname,
  });
`,
              }}
            />
          </>
        )}
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* this script helps initiate theme before interactive */}
        <script
          defer
          dangerouslySetInnerHTML={{
            __html: `(function initTheme() {
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    document.documentElement.classList.add("dark");
  }
})();`,
          }}
        ></script>
      </body>
    </Html>
  );
}
