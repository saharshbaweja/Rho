const path = require("path");

const isDev = process.env.NODE_ENV === "development";

const CONTENT_SECURITY_POLICIES = [
  "default-src 'none';",
  `script-src 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.hsforms.net *.hs-scripts.com *.hs-analytics.net *.hubspot.com *.hs-banner.com *.hscollectedforms.net *.usercentrics.eu *.licdn.com *.datadoghq-browser-agent.com *.doubleclick.net *.hsadspixel.net *.wistia.net *.ads-twitter.com apis.google.com;`,
  `script-src-elem 'self' 'unsafe-inline' 'unsafe-eval' *.googletagmanager.com *.google-analytics.com *.hsforms.net *.hs-scripts.com *.hs-analytics.net *.hubspot.com *.hs-banner.com *.hscollectedforms.net *.usercentrics.eu *.licdn.com *.datadoghq-browser-agent.com *.doubleclick.net *.hsadspixel.net *.wistia.net *.hsappstatic.net *.hubspotusercontent-eu1.net import-cdn.default.com *.ads-twitter.com *.vector.co apis.google.com;`,
  `style-src 'self' 'unsafe-inline' *.fontawesome.com *.googleapis.com;`,
  `style-src-elem 'self' 'unsafe-inline' *.fontawesome.com *.googleapis.com *.gstatic.com;`,
  `img-src 'self' data: blob: webkit-fake-url: https:;`,
  `connect-src 'self' blob: browser-intake-datadoghq.eu *.google-analytics.com *.googlesyndication.com *.googleadservices.com cdn.jsdelivr.net *.hsforms.com *.hscollectedforms.net *.hubspot.com *.hubapi.com *.hsappstatic.net *.usercentrics.eu *.ads.linkedin.com px.ads.linkedin.com google.com *.google.com *.workos.com translate-pa.googleapis.com forms.default.com nucleus.default.com *.default.com *.vector.co;`,
  `frame-src 'self' *.wistia.net *.hsforms.net *.googletagmanager.com *.doubleclick.net *.default.com *.hsforms.com *.youtube.com *.youtube-nocookie.com *.google.com docs.google.com drive.google.com view.officeapps.live.com${isDev ? " http://localhost:3007 http://localhost:3011" : ""};`,
  `font-src 'self' data: *.gstatic.com *.wistia.net fonts.cdnfonts.com migaku-public-data.migaku.com;`,
  `media-src 'self' data:;`,
  `object-src 'none';`,
  `form-action 'self' *.hsforms.com;`,
  `base-uri 'self';`,
  `frame-ancestors 'self' https://app.contentful.com${isDev ? " http://localhost:3000 http://localhost:3007" : ""};`,
  `manifest-src 'self';`,
  `worker-src 'self' blob:;`,
  ...(isDev ? [] : ["upgrade-insecure-requests;"]),
].join(" ");

const config = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  swcMinify: true,
  onDemandEntries: {
    maxInactiveAge: 1000 * 60 * 60,
    pagesBufferLength: 200,
  },
  experimental: {
    ...(!isDev && { esmExternals: false }),
    // undici is a server-side fetch used by HubSpot egress; keep it out of
    // webpack's client/server bundle and let Node resolve it natively.
    serverComponentsExternalPackages: ["undici"],
  },
  async redirects() {
    return [
      {
        source: "/home/solutions/engineering",
        destination: "/home/solutions/infrastructure-inspection",
        permanent: true,
      },
      {
        source: "/solutions/engineering",
        destination: "/home/solutions/infrastructure-inspection",
        permanent: true,
      },
      {
        source: "/home/solutions/customer-support",
        destination: "/home/solutions/rapid-response",
        permanent: true,
      },
      {
        source: "/solutions/customer-support",
        destination: "/home/solutions/rapid-response",
        permanent: true,
      },
      {
        source: "/home/solutions/data-analytics",
        destination: "/home/solutions/survey-reporting",
        permanent: true,
      },
      {
        source: "/solutions/data-analytics",
        destination: "/home/solutions/survey-reporting",
        permanent: true,
      },
      {
        source: "/home/solutions/dust-platform",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/dust-platform",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/home/solutions/knowledge",
        destination: "/home/solutions/survey-reporting",
        permanent: true,
      },
      {
        source: "/solutions/knowledge",
        destination: "/home/solutions/survey-reporting",
        permanent: true,
      },
      {
        source: "/home/solutions/marketing",
        destination: "/home/solutions/infrastructure-inspection",
        permanent: true,
      },
      {
        source: "/solutions/marketing",
        destination: "/home/solutions/infrastructure-inspection",
        permanent: true,
      },
      {
        source: "/home/solutions/recruiting-people",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/recruiting-people",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/home/solutions/sales",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/sales",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/home/solutions/legal",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/legal",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/home/solutions/it",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/it",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/home/solutions/productivity",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/productivity",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/infrastructure-inspection",
        destination: "/home/solutions/infrastructure-inspection",
        permanent: true,
      },
      {
        source: "/solutions/rapid-response",
        destination: "/home/solutions/rapid-response",
        permanent: true,
      },
      {
        source: "/solutions/search-rescue",
        destination: "/home/solutions/search-rescue",
        permanent: true,
      },
      {
        source: "/solutions/fleet-service-providers",
        destination: "/home/solutions/fleet-service-providers",
        permanent: true,
      },
      {
        source: "/solutions/survey-reporting",
        destination: "/home/solutions/survey-reporting",
        permanent: true,
      },
      {
        source: "/home/product/:path*",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/home/resources/:path*",
        destination: "/home",
        permanent: false,
      },
      { source: "/resources/:path*", destination: "/home", permanent: false },
      // Retire inherited third-party content while keeping old URLs usable.
      { source: "/sign-up", destination: "/home/contact", permanent: false },
      {
        source: "/home/credits",
        destination: "/home/pricing",
        permanent: false,
      },
      {
        source: "/home/brand-resources",
        destination: "/home/about",
        permanent: false,
      },
      {
        source: "/home/landing-security",
        destination: "/home/security",
        permanent: false,
      },
      {
        source: "/home/vulnerability",
        destination: "/home/contact",
        permanent: false,
      },
      {
        source: "/home/slack/:path*",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/home/landing/:path*",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/landing/:path*",
        destination: "/home",
        permanent: false,
      },
      {
        source: "/academy/:path*",
        destination: "/home",
        permanent: false,
      },
      { source: "/blog/:path*", destination: "/home/about", permanent: false },
      {
        source: "/customers/:path*",
        destination: "/home/about",
        permanent: false,
      },
      { source: "/go/:path*", destination: "/home", permanent: false },
      {
        source: "/website-privacy",
        destination: "/home/platform-privacy",
        permanent: true,
      },
      {
        source: "/platform-privacy",
        destination: "/home/platform-privacy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/home/contact",
        permanent: true,
      },
      {
        source: "/jobs",
        destination: "/home/contact",
        permanent: true,
      },
      {
        source: "/triggers",
        destination: "/home/integrations",
        permanent: true,
      },
      {
        source: "/contact",
        destination: "/home/contact",
        permanent: true,
      },
      {
        source: "/frames",
        destination: "/home/frames",
        permanent: true,
      },
      {
        source: "/pricing",
        destination: "/home/pricing",
        permanent: true,
      },
      {
        source: "/credits",
        destination: "/home/credits",
        permanent: true,
      },
      {
        source: "/security",
        destination: "/home/security",
        permanent: true,
      },
      {
        source: "/enterprise",
        destination: "/home/enterprise",
        permanent: true,
      },
      {
        source: "/compare/:slug",
        destination: "/",
        permanent: true,
      },
      {
        source: "/skip",
        destination:
          "/landing/skip?utm_source=podcast&utm_medium=audio&utm_campaign=skip&utm_content=listener",
        permanent: false,
      },
      {
        source: "/home/api-pricing",
        destination: "/home/pricing",
        permanent: true,
      },
    ];
  },
  poweredByHeader: false,
  skipTrailingSlashRedirect: true,
  async headers() {
    const headers = [
      {
        key: "Content-Security-Policy",
        value: CONTENT_SECURITY_POLICIES,
      },
    ];

    if (!isDev) {
      headers.push({
        key: "Strict-Transport-Security",
        value: "max-age=86400",
      });
    }

    return [
      {
        source: "/:path*",
        headers,
      },
    ];
  },
  async rewrites() {
    return {
      afterFiles: [
        // Marketing API: public URLs stay at /m/api/* but handlers live under
        // pages/api/ so Next.js treats them as API routes (not page routes).
        {
          source: "/m/api/:path*",
          destination: "/api/:path*",
        },
        // PostHog reverse proxy: the public /subtle1 path is served by
        // pages/api/subtle1/[...path].ts.
        {
          source: "/subtle1/:path*",
          destination: "/api/subtle1/:path*",
        },
      ],
    };
  },
  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@marketing": path.resolve(__dirname, "."),
    };

    config.resolve.fallback = {
      fs: false,
      net: false,
      child_process: false,
      tls: false,
      dgram: false,
      dns: false,
    };
    return config;
  },
  // @dust-tt/sparkle is a workspace symlink, so Next resolves it under the
  // monorepo tree and treats it as first-party. Without transpiling, its
  // internal global CSS imports (e.g. allotment.css inside SidebarLayout) trip
  // the "Global CSS only in _app" rule and the build fails. Transpiling routes
  // sparkle's modules through the local pipeline so its CSS is allowed.
  transpilePackages: ["@dust-tt/sparkle"],
};

module.exports = config;
