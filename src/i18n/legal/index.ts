import type { Locale } from '../index';
import { legalEn } from './en';
import { legalEs } from './es';
import type { LegalContent } from './types';

export type { LegalContent, LegalDocument, LegalSection } from './types';

export const LEGAL: Record<Locale, LegalContent> = { en: legalEn, es: legalEs };
