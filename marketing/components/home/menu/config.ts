interface NavItem {
  title: string;
  href?: string;
  isExternal?: boolean;
  rows?: number;
  tag?: string;
}

interface NavItemWithChildren extends NavItem {
  items?: NavItemWithChildren[];
}

interface MenuConfig {
  title: string;
  items: NavItemWithChildren[];
}

const CareersMenuConfig: MenuConfig = {
  title: "Careers",
  items: [
    {
      title: "About Us",
      href: "/home/about",
      isExternal: false,
    },
    {
      title: "Jobs",
      href: "/jobs",
      isExternal: true,
    },
    {
      title: "Why Dust?",
      href: "/blog/why-dust",
    },
  ],
};

const SocialMenuConfig: MenuConfig = {
  title: "Social",
  items: [
    {
      title: "X",
      href: "https://x.com/DustHQ",
      isExternal: true,
    },
    {
      title: "LinkedIn",
      href: "https://www.linkedin.com/company/dust-tt/",
      isExternal: true,
    },
    {
      title: "YouTube",
      href: "https://www.youtube.com/@dust-tt",
      isExternal: true,
    },
  ],
};

// If you change this, make sure to update the links in the extension as well.
const LegalMenuConfig: MenuConfig = {
  title: "Legal & Security",
  items: [
    {
      title: "Security",
      href: "/home/security",
    },
    {
      title: "Vulnerability Disclosure",
      href: "/home/vulnerability",
    },
    {
      title: "Terms & Policies",
      href: "/terms",
      isExternal: true,
    },
    {
      title: "Trust Center",
      href: "https://trust.dust.com",
      isExternal: true,
    },
    {
      title: "Privacy Policy",
      href: "/home/platform-privacy",
      isExternal: false,
    },
    {
      title: "Website Privacy Policy",
      href: "/website-privacy",
      isExternal: true,
    },
  ],
};

const IndustriesMenuConfig: MenuConfig = {
  title: "Industries",
  items: [
    {
      title: "Airlines",
      href: "/home/industry/b2b-saas",
    },
    {
      title: "Business Aviation",
      href: "/home/industry/consulting",
    },
    {
      title: "Cargo Operations",
      href: "/home/industry/financial-services",
    },
    {
      title: "Charter Operators",
      href: "/home/industry/insurance",
    },
    {
      title: "Regional Operators",
      href: "/home/industry/marketplace",
    },
    {
      title: "Special Missions",
      href: "/home/industry/retail-ecommerce",
    },
  ],
};

const SolutionsMenuConfig: MenuConfig = {
  title: "Solutions",
  items: [
    {
      title: "Operations teams",
    },
    {
      title: "Dispatch",
      href: "/home/solutions/sales",
    },
    {
      title: "Flight Operations",
      href: "/home/solutions/customer-support",
    },
    {
      title: "Crew & Scheduling",
      href: "/home/solutions/marketing",
    },
    {
      title: "Maintenance Control",
      href: "/home/solutions/engineering",
    },
    {
      title: "Network & Recovery",
      href: "/home/solutions/data-analytics",
    },
    {
      title: "",
    },
    {
      title: "",
    },
    {
      title: "Operational Knowledge",
      href: "/home/solutions/knowledge",
    },
    {
      title: "Systems & Data",
      href: "/home/solutions/it",
    },
    {
      title: "Safety & Compliance",
      href: "/home/solutions/legal",
    },
    {
      title: "Flight Deck & Crew",
      href: "/home/solutions/recruiting-people",
    },
    {
      title: "Operations Leadership",
      href: "/home/solutions/productivity",
    },
    {
      title: "",
    },
    {
      title: IndustriesMenuConfig.title,
    },
    IndustriesMenuConfig.items[0],
    IndustriesMenuConfig.items[1],
    IndustriesMenuConfig.items[2],
    IndustriesMenuConfig.items[3],
    IndustriesMenuConfig.items[4],
    IndustriesMenuConfig.items[5],
  ],
};

const DevelopersMenuConfig: MenuConfig = {
  title: "Developers",
  items: [
    {
      title: "Operational Data Platform",
      href: "/home/solutions/dust-platform",
    },
    {
      title: "Maintenance Intelligence",
      href: "/home/solutions/engineering",
    },
    {
      title: "Platform Documentation",
      href: "https://docs.dust.tt",
      isExternal: true,
    },
    {
      title: "Github Repo",
      href: "https://github.com/dust-tt/dust",
      isExternal: true,
    },
  ],
};

const ProductMenuConfig: MenuConfig = {
  title: "Product",
  items: [
    {
      title: "Product",
      href: "/home/product",
    },
    {
      title: "Operational Assistant",
      href: "/home/chrome-extension",
    },
    {
      title: "Mission Workspace",
      href: "/home/frames",
    },
    {
      title: "Data & Integrations",
      href: "/integrations",
    },
  ],
};

const BuildMenuConfig: MenuConfig = {
  title: "Build",
  items: [
    {
      title: "Get Started ",
      href: "https://docs.dust.tt/docs/intro",
      isExternal: true,
    },
    {
      title: "Guides & Tutorials",
      href: "https://docs.dust.tt/docs/use-cases",
      isExternal: true,
    },
    {
      title: "Academy",
      href: "/academy",
    },
  ],
};

const ExploreMenuConfig: MenuConfig = {
  title: "Explore",
  items: [
    {
      title: "Blog",
      href: "https://dust.tt/blog",
      isExternal: true,
    },
    {
      title: "Online Events",
      href: "https://app.getcontrast.io/dust",
      isExternal: true,
    },
    {
      title: "Events",
      href: "https://lu.ma/dust",
      isExternal: true,
    },
    {
      title: "Customer Stories",
      href: "/customers",
    },
  ],
};

const ConnectMenuConfig: MenuConfig = {
  title: "Connect",
  items: [
    {
      title: "Slack Community",
      href: "https://dust-community.tightknit.community/join",
      isExternal: true,
    },

    {
      title: "Support",
      href: "/home/support",
      isExternal: false,
    },
    {
      title: "Become a Partner",
      href: "/home/partner",
    },
  ],
};

const ResourcesMenuConfig: MenuConfig = {
  title: "Resources",
  items: [
    {
      title: BuildMenuConfig.title,
    },
    BuildMenuConfig.items[0],
    BuildMenuConfig.items[1],
    BuildMenuConfig.items[2],
    {
      title: "",
    },
    {
      title: ExploreMenuConfig.title,
    },
    ExploreMenuConfig.items[0],
    ExploreMenuConfig.items[1],
    ExploreMenuConfig.items[2],
    ExploreMenuConfig.items[3],
    {
      title: ConnectMenuConfig.title,
    },
    ConnectMenuConfig.items[0],
    ConnectMenuConfig.items[1],
    ConnectMenuConfig.items[2],
    {
      title: "",
    },
  ],
};

interface DocsConfig {
  mainNav: NavItemWithChildren[];
  mobileNav: NavItemWithChildren[];
  footerNav: NavItemWithChildren[];
}

export const menuConfig: DocsConfig = {
  mainNav: [
    {
      title: ProductMenuConfig.title,
      rows: 2,
      items: ProductMenuConfig.items,
    },
    {
      title: SolutionsMenuConfig.title,
      rows: 7,
      items: SolutionsMenuConfig.items,
    },
    {
      title: ResourcesMenuConfig.title,
      rows: 5,
      items: ResourcesMenuConfig.items,
    },
    {
      title: "Security",
      href: "/home/security",
    },
    {
      title: "Pricing",
      href: "/home/pricing",
    },
  ],
  mobileNav: [
    {
      title: ProductMenuConfig.title,
      items: ProductMenuConfig.items,
    },
    {
      title: "Pricing",
      href: "/home/pricing",
    },
    {
      title: SolutionsMenuConfig.title,
      items: SolutionsMenuConfig.items,
    },
    {
      title: BuildMenuConfig.title,
      items: BuildMenuConfig.items,
    },
    {
      title: ExploreMenuConfig.title,
      items: ExploreMenuConfig.items,
    },
    {
      title: ConnectMenuConfig.title,
      items: ConnectMenuConfig.items,
    },
    {
      title: CareersMenuConfig.title,
      items: CareersMenuConfig.items,
    },
    {
      title: SocialMenuConfig.title,
      items: SocialMenuConfig.items,
    },
    {
      title: LegalMenuConfig.title,
      items: LegalMenuConfig.items,
    },
  ],
  footerNav: [
    {
      title: "Product",
      items: [
        {
          title: "Product",
          href: "/home/product",
        },
        {
          title: "Operational Assistant",
          href: "/home/chrome-extension",
        },
        {
          title: "Pricing",
          href: "/home/pricing",
        },
        {
          title: "Security",
          href: "/home/security",
        },
      ],
    },
    {
      title: DevelopersMenuConfig.title,
      items: DevelopersMenuConfig.items,
    },
    {
      title: "Company",
      items: [
        {
          title: "About Us",
          href: "/home/about",
        },
        {
          title: "Jobs",
          href: "/jobs",
          isExternal: true,
          tag: "We're hiring",
        },
        {
          title: "Brand resources",
          href: "/home/brand-resources",
        },
        {
          title: "Support",
          href: "/home/support",
        },
        {
          title: "Become a Partner",
          href: "/home/partner",
        },
      ],
    },
    {
      title: "Connect",
      items: [
        {
          title: "Slack Community",
          href: "https://dust-community.tightknit.community/join",
          isExternal: true,
        },
        {
          title: "X",
          href: "https://x.com/DustHQ",
          isExternal: true,
        },
        {
          title: "LinkedIn",
          href: "https://www.linkedin.com/company/dust-tt/",
          isExternal: true,
        },
        {
          title: "YouTube",
          href: "https://www.youtube.com/@dust-tt",
          isExternal: true,
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          title: "Terms & Policies",
          href: "/terms",
          isExternal: true,
        },
        {
          title: "Privacy Policy",
          href: "/home/platform-privacy",
          isExternal: false,
        },
        {
          title: "Trust Center",
          href: "https://trust.dust.com",
          isExternal: true,
        },
        {
          title: "Vulnerability Disclosure",
          href: "/home/vulnerability",
        },
      ],
    },
  ],
};
