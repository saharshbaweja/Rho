interface NavItemWithChildren {
  title: string;
  href?: string;
  isExternal?: boolean;
  rows?: number;
  tag?: string;
  items?: NavItemWithChildren[];
}
const product = {
  title: "Product",
  rows: 5,
  items: [
    { title: "Platform overview", href: "/home/product" },
    { title: "Interactive dispatch demo", href: "/home/product#dispatch-demo" },
    { title: "Aeros Dispatch", href: "/home/product#dispatch" },
    { title: "Aeros Fleet", href: "/home/product#fleet" },
    { title: "Aeros Readiness", href: "/home/product#readiness" },
    { title: "Aeros Recover", href: "/home/product#recover" },
    { title: "Aeros Control", href: "/home/product#control" },
    { title: "Aeros Report", href: "/home/product#report" },
    { title: "Fleet integrations", href: "/integrations" },
    { title: "Operator oversight", href: "/home/security" },
  ],
};
const solutions = {
  title: "Solutions",
  rows: 4,
  items: [
    { title: "Infrastructure inspection", href: "/home/solutions/engineering" },
    {
      title: "Site patrol & response",
      href: "/home/solutions/customer-support",
    },
    { title: "Fleet service providers", href: "/home/solutions/dust-platform" },
    { title: "Survey & reporting", href: "/home/solutions/data-analytics" },
  ],
};
const company = {
  title: "Company",
  rows: 3,
  items: [
    { title: "About Aeros", href: "/home/about" },
    { title: "Talk to our team", href: "/home/contact" },
    { title: "Pricing", href: "/home/pricing" },
  ],
};
export const menuConfig: {
  mainNav: NavItemWithChildren[];
  mobileNav: NavItemWithChildren[];
  footerNav: NavItemWithChildren[];
} = {
  mainNav: [
    product,
    solutions,
    { title: "Resources", rows: 3, items: company.items },
    { title: "Oversight", href: "/home/security" },
    { title: "Pricing", href: "/home/pricing" },
  ],
  mobileNav: [product, solutions, company],
  footerNav: [
    product,
    solutions,
    company,
    {
      title: "Connect",
      items: [
        { title: "contact@aeros.com", href: "mailto:contact@aeros.com" },
        { title: "Support", href: "/home/support" },
        { title: "Provider partnerships", href: "/home/partner" },
        { title: "Website data handling", href: "/home/platform-privacy" },
      ],
    },
  ],
};
