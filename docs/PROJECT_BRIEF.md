# Spanish Civil War Political Ideology Quiz: project brief

> A quick political compass questionnaire to match personal ideological leanings

Prepared November 15, 2026 by Solrac. Decisions marked _Not decided_ are open questions for the builder to recommend and the owner to approve.

## 1. The product

- **Project name:** Spanish Civil War Political Ideology Quiz
- **One-line pitch:** A quick political compass questionnaire to match personal ideological leanings

**The problem, and who has it:**

- This website is a funny parody of political ideology "tests" that quiz or question people on certain scenarios and then rank answers to build a political compass profile. The website will look real and "pop" academic like. It will advertise it's self like a real website. The problem, per se, isn't something to be fixed but just a funny attempt to mimic and parody political compass sites.   Although this form asks for user IDs, emails, etc.....there won't be any need for people to put in data, generate usernames, etc just yet. It's not set up like that. Just an interface with one question. The interface should read "60 second political ideology test" with a button that says "start". The first and only question is "In the Spanish Civil War (1936–1939), which side do you sympathize with more: the Republicans (Loyalists, Second Spanish Republic, International Brigades, etc) or the Nationalists (Franco, Falangists, etc) ”. It should say question # 1 in big bold letters with the answers clickable and below it. When the survey user clicks one of the boxes the survey is over. If the user clicks "Republicans" the screen goes red and in big yellow lettering it says "YOU'RE A COMMUNIST!!!" with a huge image of the soviet hammer and sickle. If the user clicks "Nationalists" the screen goes Brown and in big yellow lettering it says "YOU'RE A FASCIST!!!" with a picture of fascist imagery (no nazi things). Then the quiz is over and a button pops up that says "take quiz again" to reset the page.

**Who uses it:**

- Random unsuspecting people drawn to the site through other channels and word of mouth. Political junkies, students, people into comedy. That said, it won't advertise these things.

**Top user journeys:**

- Click the start button.
- Answer the one question.

**Must-have for the first release:**

- A graphically pleasing webpage with animations and color.

**Not in the first release:**

- google adsense set up
- links to other projects supported by the team
- links to buy the IP and idea

- **How you'll know it's working:** 100 hits a week by week 4
- **Target launch:** Dec 1st 2026
- **Where it runs:** Web app; Phone browsers; Desktop app; Browser extension

## 2. Users and accounts

- **Who pays you:** Larger companies with security or procurement teams
- **How accounts work:** Each person has their own data
- **Sign-in methods:** Email link or code
- **Authentication provider:** _Not decided_
- **Multi-factor authentication:** _Not decided_

**Roles and what each can do:**

- Owner: Control the IP, email and contact info of the design team, socials

- **Support needs to sign in as a user:** Yes
- **Enterprise customers need automatic user removal (SCIM):** _Not decided_
- **Will anyone under 16 use it?:** Yes

## 3. Data

**Main things the app stores:**

- Business: Name, owner. Collection of survey data

- **Sensitive data:** None of these
- **Personal details you'll collect:** None
- **Database:** _Not decided_
- **Will the browser read and write the database directly?:** Yes
- **Where data must live:** United States
- **How much recent data could you afford to lose in a disaster?:** _Not decided_
- **Deleted items go to a trash first:** Yes
- **Users in several time zones:** Yes
- **Languages at launch:** More than one

## 4. Money

- **How it makes money:** Free to use, paid for by ads; Affiliate links and referral commissions; Sponsorships or sponsored content; Sends visitors to our own or partner products

## 5. Ads and affiliates

- **Ad networks:** Google AdSense
- **Ad targeting:** Personalized ads where people allow it
- **Consent tool:** Google's own consent messages (Privacy & messaging)
- **Where ads appear:** Sidebar
- **Where disclosures appear:** Next to each affiliate link or sponsored item
- **Where visitors will come from:** Search engines; Social media
- **Will AI write pages people find through search?:** No
- **Monthly pageviews expected in a year, and the revenue goal:** 1,000 pageviews a month

## 6. AI features

- **Does the app call AI models?:** No

## 7. Integrations

- **Email:** No email

## 8. Customers and compliance

**Rules your answers point to:**

- Children's data: COPPA in the US and age rules under GDPR.
- Enterprise buyers: expect SOC 2, a penetration test report and security questionnaires.
- Ads for visitors in the EEA, UK or Switzerland: Google requires a Google-certified consent tool using the IAB Transparency and Consent Framework before it serves personalized ads. Without one you get limited or non-personalized ads at best.
- US state privacy laws: personalized ads usually trigger the right to opt out of selling, sharing or targeted advertising. Add a “Do Not Sell or Share My Personal Information” link and honor Global Privacy Control signals, which 12 states required as of mid-2026.
- FTC Endorsement Guides: disclose affiliate and sponsored links clearly, where readers see them. “Paid link” beside the link can work; “affiliate link” alone usually doesn't.
- Children and ads: under the amended COPPA Rule (compliance from 22 April 2026), sharing children's data with ad partners needs separate parental consent. Plan on contextual ads only for anyone under 13.
- Ad network policies: never click your own ads or ask anyone to, and keep ads away from buttons, menus and download links. Breaking these rules can close your ad account.

- **Legal documents:** Terms of service; Privacy policy; Data processing agreement for business customers; Cookie consent for EU visitors

## 9. Scale and reliability

- **Users expected within a year:** 1,000 to 100,000
- **Where your users are:** North America; Europe
- **Availability target:** Best effort
- **Public status page:** Yes

## 10. Stack and environments

- **Stack:** Builder recommends, I approve
- **Environments:** Local development with fake data; Preview deploy per pull request; Staging; Production
- **CI:** GitHub Actions

## 11. How coding agents work on it

- **Coding agents you'll use:** Claude Code
- **Checks every change must pass:** Unit tests; Type check; Lint; Build; End-to-end tests (Playwright); Secret scan; Dependency scan
- **Tests for core logic:** Written with each feature
- **Pull request size:** One feature per pull request (recommended)
- **Written spec before coding:** For anything over about a day of work (recommended)
- **Changes that always need a human reviewer:** Sign-in and permissions; Payments; Data access and queries; Infrastructure and CI; Database migrations
- **Human reviewer:** Solrac
- **Wait before adopting newly published package versions:** 3 days

## 12. People and budget

- **Decision-maker:** Solrac
- **Team:** Just me
- **Who gets alerts, and their backup:** Me by phone
- **Security contact address:** databecause@protonmail.com
- **Domain, cloud, GitHub, payment and email accounts are in the company's name with two admins:** Not yet
- **Monthly budget for hosting and tools:** $25
- **Alert me when monthly spend passes:** $25

## Open questions

The builder should recommend an answer for each, with the reason, and wait for the owner's approval.

- Authentication provider (Hosted providers handle reset links, MFA, session revocation and login rate limits. Building your own means testing all of that yourself.)
- Multi-factor authentication
- Enterprise customers need automatic user removal (SCIM)
- Database
- How much recent data could you afford to lose in a disaster?
