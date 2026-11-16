We're starting a new project: Spanish Civil War Political Ideology Quiz. A quick political compass questionnaire to match personal ideological leanings.

I've attached three files. Save them as docs/PROJECT_BRIEF.md, CLAUDE.md (in the repo root) and docs/LAUNCH_CHECKLIST.md, then read all three before doing anything else.

Step 1: plan, then stop. Write docs/ARCHITECTURE.md covering the stack, the data model (tables, keys, and which rows belong to which user), the sign-in and permission model, the environments, and how money, email, background work flow through the system. For every item under “Open questions” in the brief, give your recommendation and the reason. Point out anything in the brief that's contradictory or risky. Then stop and wait for my approval.

Step 2: foundations, before any feature. Set up the repo, local and staging environments with seeded fake data, and CI that runs unit tests, type check, lint, build, end-to-end tests (playwright), secret scan, dependency scan on every pull request, with branch protection. Add error tracking and an external uptime check. Fill in the Commands section of CLAUDE.md. Because the site earns from ads or affiliate links, also set up the consent tool, the ad slot component and /ads.txt, the affiliate link helper, link disclosures and a privacy policy that lists every ad and affiliate partner in this step, before any ad or partner link goes live. Open this as its own pull request.

Step 3: features. Build the must-have list in the brief in order, one pull request per feature. Each starts with a short spec in docs/specs/ when it's more than a day of work and ends with the check output. Whenever a pull request completes a launch-checklist item, tick it in docs/LAUNCH_CHECKLIST.md with the evidence. Before launch, all 89 “Before launch” and “Required for your data” items must be ticked.

Never touch production, and ask me before adding a paid service.
