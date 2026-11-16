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

export interface LegalContent {
  privacy: LegalDocument;
  terms: LegalDocument;
}
