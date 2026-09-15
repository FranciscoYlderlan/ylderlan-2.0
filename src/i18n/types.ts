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

export type ProfileField = {
  key: string
  value: string
  /** `string` renders quoted and mint, `number` bare and violet. */
  type: 'string' | 'number'
}

export type StackGroup = {
  id: string
  label: string
  items: string[]
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
    role: string
    profileFile: string
    profile: ProfileField[]
    companiesIntro: string
    companiesOutro: string
    listSeparator: string
    listLastSeparator: string
    badgeLocation: string
    badgeLocationValue: string
    badgeFocus: string
    badgeFocusValue: string
    badgeStatus: string
    badgeStatusValue: string
  }
  projects: {
    command: string
    seeMore: string
    loading: string
    error: string
    retry: string
    empty: string
    noDescription: string
    stars_one: string
    stars_other: string
  }
  stack: {
    command: string
    groups: StackGroup[]
    aiLayerLabel: string
    aiLayer: string
  }
  social: {
    command: string
    github: string
    githubHandle: string
    linkedin: string
    linkedinHandle: string
    email: string
    emailHandle: string
  }
  about: {
    command: string
    /** Markdown-lite: `**span**` renders as highlighted text. */
    paragraphs: string[]
  }
  experience: {
    command: string
    at: string
    items: ExperienceItem[]
  }
  footer: {
    builtWith: string
    rights: string
    exit: string
  }
}
