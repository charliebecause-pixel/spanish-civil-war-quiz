import type { LegalContent } from './types';

// `{contact}` is replaced with the contact address from the site config.
export const legalEn: LegalContent = {
  about: {
    title: 'About this site',
    description:
      'What this site is, what it makes fun of, and where its figures and pictures come from.',
    updated: '2026-11-19',
    intro: [
      'The 60 Second Political Ideology Test is a parody of online political quizzes. It is a joke, and this page is where it says so plainly.',
    ],
    sections: [
      {
        heading: 'What it makes fun of',
        paragraphs: [
          'Online political quizzes ask dozens of questions and then place you precisely on a political map. This one claims the same precision from a single question about a war that ended in 1939, and then gives you the most extreme label it can find.',
        ],
      },
      {
        heading: 'The joke',
        paragraphs: [
          'The question is a false choice. Pick the Republicans and you are told you are a communist; pick the Nationalists and you are told you are a fascist, at once and in giant letters. It is how political opponents often label each other today: one opinion, and you are sorted into the worst camp on that side.',
          'Your result says nothing about you. Not everyone on the Republican side was a communist, and not everyone on the Nationalist side was a fascist.',
        ],
      },
      {
        heading: 'The Spanish Civil War, briefly',
        paragraphs: [
          "In July 1936, army officers rose against the elected government of Spain's Second Republic. The war that followed lasted until April 1939.",
        ],
        items: [
          'The Republicans were a coalition of liberal republicans, socialists, communists, anarchists, and Basque and Catalan nationalists, joined by volunteers from abroad in the International Brigades. The Soviet Union and Mexico sent them aid.',
          "The Nationalists were the rebel army, soon led by General Francisco Franco, with the Falange (Spain's fascist party), monarchists and much of the Catholic right. Fascist Italy and Nazi Germany sent them troops, aircraft and weapons.",
          'Both sides killed tens of thousands of civilians behind their own lines. Estimates of all the dead vary; about 500,000 is a figure often given.',
          'The Nationalists won. Franco ruled Spain as a dictator until his death in 1975.',
        ],
      },
      {
        heading: 'Where the death tolls come from',
        paragraphs: [
          'The figures on the results count people killed by communist regimes and by fascist and Nazi regimes worldwide, not by the two sides in Spain.',
          'For communist regimes, scholars’ estimates run from about 21 million (Benjamin Valentino, Final Solutions, 2005) to about 100 million (Stéphane Courtois and others, The Black Book of Communism, 1997). The site says “over 60 million”, a figure inside that range.',
          'For fascist and Nazi regimes, the site says “over 11 million”: the 6 million Jews murdered in the Holocaust and about 5.9 million others murdered by Nazi Germany and its allies, as counted by the United States Holocaust Memorial Museum. It does not count the Second World War itself, which killed 70 to 85 million people.',
        ],
      },
      {
        heading: 'The pictures',
        paragraphs: [
          'The posters behind the question and the photos behind the results are historical images from Wikimedia Commons. The image credits page, linked at the bottom of every page, names each one with its author, licence and source.',
          'The hammer and sickle and the fasces on the results were drawn for this site. The site shows no Nazi emblems and no victims’ bodies.',
        ],
      },
      {
        heading: 'Your answer',
        paragraphs: [
          'Nothing you click is sent anywhere. There are no accounts and no sign-ups. The privacy policy has the details.',
        ],
      },
      {
        heading: 'Contact',
        paragraphs: ['Write to {contact}.'],
      },
    ],
  },
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
