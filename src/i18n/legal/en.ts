import type { LegalContent } from './types';

// `{contact}` is replaced with the contact address from the site config.
export const legalEn: LegalContent = {
  privacy: {
    title: 'Privacy policy',
    description: 'What happens to information when you use this site.',
    updated: '2026-11-16',
    intro: [
      'This site is a parody of online political quizzes. It is built to collect as little as possible about the people who visit it.',
      'This policy explains what happens to information when you use the site. Questions go to {contact}.',
    ],
    sections: [
      {
        heading: 'What we collect from you',
        paragraphs: [
          'Nothing that identifies you. There are no accounts, no sign-up forms and no comment boxes.',
          'The answer you click in the quiz stays in your browser. It is never sent to us or to anyone else, and it is gone when you close or reload the page.',
        ],
      },
      {
        heading: 'What is processed automatically',
        paragraphs: [
          'No website can be delivered without some technical information passing through the companies that run it:',
        ],
        items: [
          'Your IP address and basic request details (the page asked for, the time and your browser type) are processed by our hosting provider to deliver pages and to block attacks.',
          'Visits are counted in aggregate, without cookies and without building a profile of you.',
          "If the site's code fails in your browser, a technical error report is sent so we can fix it. It contains the error, the page address and your browser type. Anything that looks like personal information is removed before the report leaves your browser.",
        ],
      },
      {
        id: 'partners',
        heading: 'Companies that help us run this site',
        paragraphs: [
          "These are all the outside companies involved. The list is generated from the site's own settings, so it changes whenever a partner is added or removed.",
        ],
      },
      {
        heading: 'Cookies',
        paragraphs: [
          'This site sets no cookies of its own and stores nothing on your device. If a company in the list above sets a cookie, the cookie is named beside that company.',
        ],
      },
      {
        heading: 'Advertising and paid links',
        paragraphs: [
          'The site shows advertising or paid links only if an advertising or paid-link company appears in the list above.',
          'Any advertising on this site is non-personalized: ads are not chosen using your browsing history or a profile of you. Every paid link is labelled as one right beside the link.',
        ],
      },
      {
        heading: 'Your privacy choices',
        paragraphs: [
          'We do not sell or share personal information, and we do not use it for targeted advertising. If your browser sends a Global Privacy Control signal, we treat it as a request to opt out of any sale or sharing.',
          'Depending on where you live, you may have the right to ask what information a company holds about you and to have it corrected or deleted. We hold nothing that identifies you, but you are welcome to write to {contact} and we will answer.',
        ],
      },
      {
        heading: 'Children',
        paragraphs: [
          'The site is not directed at children, and it collects no personal information from anyone, whatever their age.',
        ],
      },
      {
        heading: 'Where information is processed',
        paragraphs: [
          'The companies listed above process information in the United States and, to deliver pages quickly, on servers close to you.',
        ],
      },
      {
        heading: 'Changes to this policy',
        paragraphs: [
          'We update this page before any new partner or any new use of information goes live. The date at the top shows the latest change.',
        ],
      },
    ],
  },
  terms: {
    title: 'Terms of use',
    description: 'The rules for using this site.',
    updated: '2026-11-16',
    intro: [
      'By using this site you agree to these terms. If you do not agree, please do not use it.',
    ],
    sections: [
      {
        heading: 'This site is a joke',
        paragraphs: [
          'This site is a parody of online political quizzes, made for entertainment. Its “results” are a punchline. They are not an assessment of you, your beliefs or your character, and they are not a statement of fact about anyone.',
          'Nothing here is political, historical, educational or professional advice.',
        ],
      },
      {
        heading: 'Using the site',
        paragraphs: [
          'You may use the site for personal, non-commercial purposes. Please do not attack it, overload it, or copy it wholesale and present it as your own.',
        ],
      },
      {
        heading: 'Our content',
        paragraphs: [
          "The text, design and images belong to the site's owner unless stated otherwise. You are welcome to link to the site and to share screenshots of your result.",
        ],
      },
      {
        heading: 'Links, advertising and paid links',
        paragraphs: [
          'The site may link to other sites and may show advertising or paid links. Paid links are always labelled. We are not responsible for the content or practices of other sites.',
        ],
      },
      {
        heading: 'No warranty',
        paragraphs: [
          'The site is provided as is, on a best-effort basis, with no guarantee that it will be available, free of errors or suitable for any purpose.',
        ],
      },
      {
        heading: 'Limit of liability',
        paragraphs: [
          "To the fullest extent the law allows, the site's owner is not liable for any loss arising from your use of the site.",
        ],
      },
      {
        heading: 'Changes',
        paragraphs: [
          'We may change the site or these terms at any time. The date at the top shows the latest change.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Write to {contact}.'],
      },
    ],
  },
};
