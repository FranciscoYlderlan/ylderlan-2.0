export const GITHUB_USERNAME = 'FranciscoYlderlan'

export const siteConfig = {
  name: 'Ylderlan',
  fullName: 'Francisco Ylderlan',
  url: 'https://ylderlan.vercel.app',
  ogImage: '/og-image.png',
  email: 'franciscoylderlanoliveira@gmail.com',
  links: {
    github: `https://github.com/${GITHUB_USERNAME}`,
    githubRepositories: `https://github.com/${GITHUB_USERNAME}?tab=repositories`,
    linkedin: 'https://www.linkedin.com/in/franciscoylderlanoliveira/',
  },
} as const

/**
 * Companies highlighted in the hero line. The accent colour is deliberately
 * token-based so both themes stay legible.
 */
export const featuredCompanies = [
  { id: 'tm-mentoring', name: 'TM Mentoring', className: 'text-accent-1' },
  { id: 'lab-yes', name: 'Lab Yes!', className: 'text-accent-2' },
  { id: 'saude-publica-ma', name: 'Saúde Pública MA', className: 'text-accent-3' },
  { id: 'nca-ufma', name: 'UFMA', className: 'text-accent-4' },
] as const
