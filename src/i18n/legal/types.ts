export interface LegalSection {
  /** Optional hook a page can use to insert generated content after this section. */
  id?: string;
  heading: string;
  paragraphs: string[];
  items?: string[];
}

export interface LegalDocument {
  title: string;
  description: string;
  /** `YYYY-MM-DD`. Change it whenever the text changes. */
  updated: string;
  intro: string[];
  sections: LegalSection[];
}

/** The site's plain-text pages. The about page shares the legal pages' shape. */
export interface LegalContent {
  about: LegalDocument;
  privacy: LegalDocument;
  terms: LegalDocument;
}
