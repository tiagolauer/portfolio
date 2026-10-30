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

export const NAV_ITEMS = [
  { id: SECTION_ID.work, label: "Work" },
  { id: SECTION_ID.openSource, label: "Open source" },
  { id: SECTION_ID.experience, label: "Experience" },
  { id: SECTION_ID.contact, label: "Contact" },
] as const;

export const TOOL_GROUPS = [
  {
    label: "Most days",
    items: "TypeScript, Vue and Nuxt, React, React Native, Node.js, C# and ASP.NET Core, GraphQL, PostgreSQL.",
  },
  { label: "Infrastructure", items: "Docker, AWS, Azure DevOps, GitHub Actions, Supabase." },
  { label: "Also used", items: "Rust, Python, PHP, Flutter, n8n, local LLMs." },
  { label: "Languages", items: "Portuguese (native), English (professional), Spanish (basic)." },
] as const;
