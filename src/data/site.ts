export type Locale = 'en' | 'id'

export interface LocalizedText {
  en: string
  id: string
}

export interface SiteContent {
  navigation: Array<{
    id: string
    label: LocalizedText
    href: string
  }>
}

export const siteContent: SiteContent = {
  navigation: [],
}
