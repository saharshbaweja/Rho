interface NavItemWithChildren {
  title: string;
  href?: string;
  isExternal?: boolean;
  rows?: number;
  tag?: string;
  items?: NavItemWithChildren[];
}
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
    solutions,
    { title: "Oversight", href: "/home/security" },
    { title: "Pricing", href: "/home/pricing" },
  ],
  mobileNav: [solutions, company],
  footerNav: [
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
