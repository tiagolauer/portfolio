export const SITE = {
  name: "Tiago Lauer",
  fullName: "Tiago Estrela Lauer",
  initials: "TL",
  title: "Tiago Lauer, software engineer",
  description:
    "Software engineer in Brusque, Brazil, working across TypeScript, Vue, React Native and .NET. Creator of OwlSQL.",
  email: "tiagoestrelalauer@gmail.com",
  location: "Brusque, Santa Catarina, Brazil",
  github: "https://github.com/tiagolauer",
  linkedin: "https://linkedin.com/in/tiagolauer",
} as const;

export const SECTION_ID = {
  top: "top",
  work: "work",
  openSource: "open-source",
  experience: "experience",
  contact: "contact",
} as const;

export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINK = {
  work: { href: `/#${SECTION_ID.work}`, label: "Work" },
  openSource: { href: `/#${SECTION_ID.openSource}`, label: "Open source" },
  experience: { href: `/#${SECTION_ID.experience}`, label: "Experience" },
  contact: { href: `/#${SECTION_ID.contact}`, label: "Contact" },
  blog: { href: "/blog", label: "Blog" },
} as const satisfies Record<string, NavLink>;

export const NAV_WITHOUT_BLOG: readonly NavLink[] = [
  NAV_LINK.work,
  NAV_LINK.openSource,
  NAV_LINK.experience,
  NAV_LINK.contact,
];

export const NAV_WITH_BLOG: readonly NavLink[] = [NAV_LINK.work, NAV_LINK.openSource, NAV_LINK.blog, NAV_LINK.contact];

export const TOOL_GROUPS = [
  {
    label: "Most days",
    items: "TypeScript, Vue and Nuxt, React, React Native, Node.js, C# and ASP.NET Core, GraphQL, PostgreSQL.",
  },
  { label: "Infrastructure", items: "Docker, AWS, Azure DevOps, GitHub Actions, Supabase." },
  { label: "Also used", items: "Rust, Python, PHP, Flutter, n8n, local LLMs." },
  { label: "Languages", items: "Portuguese (native), English (professional), Spanish (basic)." },
] as const;
