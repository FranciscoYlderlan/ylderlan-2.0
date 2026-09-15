export type ExperienceItem = {
  /** Stable key, shared across locales, used as the tab value. */
  id: string
  company: string
  role: string
  period: string
  location: string
  bullets: string[]
  stack: string[]
  note?: string
}

export type Translation = {
  meta: {
    title: string
    description: string
  }
  a11y: {
    skipToContent: string
    toggleTheme: string
    changeLanguage: string
    themeLight: string
    themeDark: string
    avatarAlt: string
    casualPhotoAlt: string
  }
  hero: {
    greeting: string
    name: string
    companiesIntro: string
    companiesOutro: string
    listSeparator: string
    listLastSeparator: string
  }
  projects: {
    title: string
    seeMore: string
    loading: string
    error: string
    retry: string
    empty: string
    noDescription: string
    stars_one: string
    stars_other: string
  }
  social: {
    title: string
    github: string
    githubHandle: string
    linkedin: string
    linkedinHandle: string
    email: string
    emailHandle: string
  }
  about: {
    title: string
    /** Markdown-lite: **bold** spans are rendered as highlighted text. */
    paragraphs: string[]
  }
  experience: {
    title: string
    at: string
    items: ExperienceItem[]
  }
  footer: {
    builtWith: string
    rights: string
  }
}
