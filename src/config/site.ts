export const GITHUB_USERNAME = "FranciscoYlderlan";

export const siteConfig = {
  name: "Ylderlan",
  fullName: "Francisco Ylderlan",
  url: "https://ylderlan.vercel.app",
  ogImage: "/og-image.png",
  email: "franciscoylderlan@gmail.com",
  links: {
    github: `https://github.com/${GITHUB_USERNAME}`,
    githubRepositories: `https://github.com/${GITHUB_USERNAME}?tab=repositories`,
    linkedin: "https://www.linkedin.com/in/franciscoylderlanoliveira/",
  },
} as const;

/**
 * Companies highlighted in the hero line. Each takes one of the terminal
 * accents so the row reads like syntax highlighting rather than decoration.
 */
export const featuredCompanies = [
  { id: "tm-mentoring", name: "TM Mentoring", className: "text-mint" },
  { id: "lab-yes", name: "Lab Yes!", className: "text-sky" },
  {
    id: "saude-publica-ma",
    name: "Departamento de Saúde Pública - MA",
    className: "text-violet",
  },
  { id: "nca-ufma", name: "UFMA", className: "text-amber" },
] as const;
