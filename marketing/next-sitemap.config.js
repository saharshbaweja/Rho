const EXCLUDED_PATHS = [
  "/m/api*",
  "/api*",
  "/home/product*",
  "/home/resources*",
  "/resources*",
];

const isBotCrawlingEnabled =
  process.env.NEXT_PUBLIC_ENABLE_BOT_CRAWLING === "true";

const getRobotsPolicies = () => {
  if (isBotCrawlingEnabled) {
    return [
      {
        userAgent: "*",
        allow: "/",
        disallow: EXCLUDED_PATHS,
      },
    ];
  } else {
    return [
      {
        userAgent: "*",
        disallow: "/",
      },
    ];
  }
};

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3102"),
  exclude: EXCLUDED_PATHS,
  generateIndexSitemap: false,
  changefreq: "weekly",
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: getRobotsPolicies(),
  },
};
