# Owner setup: the steps only Solrac can do

Some things need your own accounts, passwords and approvals, so a coding agent cannot do them for you. This page lists every one of them, one click at a time. Do the parts in order.

Everything here is free. If any screen asks for a credit card or offers a paid plan, stop and choose the free option, or ask Claude first.

A note on button names: they are written as these services labelled them when this page was written (November 2026). Services rename things. If a label is slightly different, pick the closest match; if you cannot find it, tell Claude what you see on screen.

| Part | What it gives you | Time |
| --- | --- | --- |
| 1 | The code on GitHub | 5 minutes |
| 2 | The first pull request, with the automatic checks running | 5 minutes |
| 3 | A rule that nothing can reach `main` without passing the checks | 5 minutes |
| 4 | A preview website for every pull request, and a staging site | 15 minutes |
| 5 | Error reports from the site | 10 minutes |
| 6 | A phone alert when the site is down, and a public status page | 10 minutes |
| 7 | Stronger sign-in on the accounts that control the site | 10 minutes |

---

## Part 1: Put the code on GitHub

1. Open https://github.com in your browser.
2. If you do not have a GitHub account, click **Sign up** and create one. If you have one, click **Sign in**.
3. Open https://github.com/new
4. In the **Repository name** box, type `spanish-civil-war-quiz`
5. Leave **Description** empty.
6. Under visibility, select **Public**. (Public repositories get branch rules and the checks for free. Nothing secret is in this code.)
7. Make sure **Add a README file** is not ticked.
8. Make sure **Add .gitignore** says **None** (or "No .gitignore").
9. Make sure **Choose a license** says **None** (or "No license").
10. Click the green **Create repository** button.
11. You land on a page titled "Quick setup". Near the top is a box with a web address ending in `.git`. Make sure the **HTTPS** button beside it is selected, not SSH.
12. Click the copy icon at the right end of that box.
13. Go back to Claude, paste the address, and say "push the code". Claude runs the commands.
14. The first time, a window titled **Git Credential Manager** opens. Click **Sign in with your browser**.
15. Your browser opens a GitHub page. Click **Authorize git-ecosystem**. (You may be asked for your GitHub password. Type it yourself; never give it to Claude.)
16. Go back to Claude and wait for it to say the push is finished.
17. Reload your repository page on GitHub. You should now see the project's files.

## Part 2: Open the first pull request

1. On your repository page, a yellow bar says "**foundations** had recent pushes". Click the green **Compare & pull request** button in that bar.
   - If there is no yellow bar: click the **Pull requests** tab, click **New pull request**, set **base** to `main` and **compare** to `foundations`, then click **Create pull request**.
2. In the **Add a title** box, type: `Foundations: tooling, CI, security headers and dormant ads plumbing`
3. On your computer, open the file `docs/pull-requests/0001-foundations.md` in this project.
4. Select all of its text and copy it.
5. Back in the browser, click in the large **Add a description** box and paste.
6. Click the green **Create pull request** button.
7. Scroll down to the box that lists the checks. Three checks start running, each with a yellow dot:
   - Lint, types, unit tests, build, end-to-end
   - Secret scan (gitleaks)
   - Dependency scan (OSV-Scanner)
8. Wait about five minutes. Each yellow dot turns into a green tick or a red cross.
9. If all three are green, go to Part 3.
10. If any is red: click **Details** beside it, copy the web address of the page that opens, give it to Claude and say "this check failed". Do not merge.

Do not click **Merge pull request** yet. Finish Part 3 and Part 4 first, so you can look at the preview site before you merge.

## Part 3: Protect the main branch

Do this after the checks in Part 2 have run at least once. GitHub can only find checks that have already run.

1. On your repository page, click the **Settings** tab (the last tab in the row, with a cog icon).
2. In the left sidebar, under "Code and automation", click **Rules**, then click **Rulesets**.
3. Click the green **New ruleset** button, then click **New branch ruleset**.
4. In the **Ruleset Name** box, type `protect-main`
5. Click the **Enforcement status** dropdown and choose **Active**.
6. Under "Target branches", click **Add target**, then click **Include default branch**.
7. Under "Branch rules", tick **Restrict deletions**.
8. Tick **Require a pull request before merging**. More options appear underneath.
9. Set **Required approvals** to **0**. (GitHub does not let you approve your own pull request, so any higher number would block you. You reading the changes and pressing Merge is the review. See docs/decisions/0004.)
10. Tick **Require status checks to pass**. More options appear underneath.
11. Click **Add checks**. In the search box, type `Lint` and click **Lint, types, unit tests, build, end-to-end** in the list.
12. Click **Add checks** again, type `Secret` and click **Secret scan (gitleaks)**.
13. Click **Add checks** again, type `Dependency` and click the entry that starts with **Dependency scan (OSV-Scanner)**.
14. Tick **Block force pushes**.
15. Scroll to the bottom and click the green **Create** button.

Now turn on GitHub's own protections:

16. Still in **Settings**, in the left sidebar under "Security", click **Advanced Security**. (Older screens call it "Code security".)
17. Find **Dependabot alerts** and click **Enable**.
18. Find **Dependabot security updates** and click **Enable**.
19. Find **Secret Protection** (older screens: "Secret scanning") and click **Enable**.
20. Find **Push protection** underneath it and click **Enable**.

Tell Claude "branch rule is on". Claude will try to push straight to `main` to prove the rule blocks it.

## Part 4: Cloudflare Pages (preview sites and staging)

1. Open https://dash.cloudflare.com/sign-up
2. Create a Cloudflare account with your email and a password you choose. Choose the **Free** plan if asked.
3. Cloudflare sends you an email. Open it and click the verification link.
4. In the Cloudflare dashboard, in the left sidebar, click **Workers & Pages**. (It may be inside a group called **Compute**.)
5. Click the **Create** button.
6. Click the **Pages** tab.
7. Click **Import an existing Git repository** (the button may say **Connect to Git** or **Get started**).
8. Click **GitHub**, then **Connect GitHub**. A GitHub window opens.
9. In the GitHub window, select **Only select repositories**.
10. Click the **Select repositories** dropdown and choose `spanish-civil-war-quiz`.
11. Click **Install & Authorize**.
12. Back in Cloudflare, click `spanish-civil-war-quiz` in the list, then click **Begin setup**.
13. In **Project name**, leave `spanish-civil-war-quiz`.
14. In **Production branch**, choose `main`.
15. In **Framework preset**, choose **None**.
16. In **Build command**, type exactly:

    ```
    npx pnpm@12.20.0 install --frozen-lockfile && npx pnpm@12.20.0 build
    ```

17. In **Build output directory**, type `dist`
18. Click **Environment variables (advanced)** to open it.
19. Click **Add variable**. In **Variable name** type `NODE_VERSION` and in **Value** type `24`
20. Click **Add variable** again. In **Variable name** type `SKIP_DEPENDENCY_INSTALL` and in **Value** type `true`
21. Click **Save and Deploy**.
22. Cloudflare starts a build of `main`. **This first build is expected to fail.** The log will say the site address is still a placeholder. That is a safety check: the real site cannot be published until you choose a domain. Nothing is wrong.
23. Go back to your pull request on GitHub and reload the page.
24. A new comment from **cloudflare-workers-and-pages** appears within a few minutes, with a **Branch Preview URL**. Click it.
25. You should see a page headed "60 second political ideology test".
26. Copy the Branch Preview URL, give it to Claude and say "Cloudflare is connected".

If the preview build fails too, open the failed deployment in Cloudflare, click **View details**, copy the log text and give it to Claude.

After you merge the pull request, Claude will create a `staging` branch. Its permanent address will be `https://staging.spanish-civil-war-quiz.pages.dev`

## Part 5: Sentry (error reports)

1. Open https://sentry.io/signup/
2. Create an account. If asked where to store data, choose **United States**. Choose the free **Developer** plan if asked.
3. On the "Select a platform" screen, click **Browser JavaScript**.
4. In **Project name**, type `quiz-staging`
5. Click **Create Project**.
6. Sentry shows setup instructions. Ignore them; the code is already in the project. Click **Skip Onboarding** (or the Sentry logo at the top left).
7. In the left sidebar, click **Settings**.
8. Under "Organization", click **Security & Privacy**.
9. Turn on **Prevent Storing of IP Addresses**.
10. Make sure **Require Data Scrubber** and **Require Using Default Scrubbers** are both turned on.
11. In the Settings sidebar, click **Projects**, then click **quiz-staging**.
12. In the project's sidebar, click **Client Keys (DSN)**.
13. Click the copy icon beside the **DSN** box. It looks like a web address starting with `https://`.

Now give that address to Cloudflare:

14. In the Cloudflare dashboard, click **Workers & Pages**, then click **spanish-civil-war-quiz**.
15. Click the **Settings** tab.
16. Near the top, click the **Choose Environment** dropdown and choose **Preview**.
17. Find **Variables and Secrets** and click **Add**.
18. Leave **Type** as **Text**. In **Variable name** type `PUBLIC_SENTRY_DSN` and paste the DSN into **Value**.
19. Click **Save**.
20. Tell Claude "Sentry is set up". Claude will trigger a new preview build and send a test error with you.

Do the same again with a second Sentry project named `quiz-production` and the **Production** environment when the site is ready to launch.

## Part 6: Better Stack (down alerts and status page)

Do this after the `staging` branch exists.

1. Open https://betterstack.com and click **Sign up**. Create an account on the free plan.
2. In the left sidebar, click **Uptime**, then **Monitors**.
3. Click **Create monitor**.
4. Under "Alert us when", leave **URL becomes unavailable**.
5. In **URL to monitor**, type `https://staging.spanish-civil-war-quiz.pages.dev/`
6. Under "On-call escalation", tick **E-mail** and **Push notification**.
7. Click **Create monitor**.
8. On your phone, install the **Better Stack** app from the App Store or Google Play.
9. Open the app, sign in, and tap **Allow** when it asks to send notifications.
10. Back in the browser, in the left sidebar, click **Status pages**.
11. Click **Create status page**.
12. In **Company name**, type `60 Second Political Ideology Test`
13. In **Subdomain**, type a short name such as `ideology-test`
14. Click **Create status page**.
15. On the new status page's settings, open the **Structure** tab, click **Add resource**, and choose the monitor you created in step 7.
16. Click **Save changes**.

Test the alert:

17. Go to **Uptime**, **Monitors**, click your monitor, then click **Configure**.
18. Change the URL to `https://staging.spanish-civil-war-quiz.pages.dev/alert-test-not-a-page/` and click **Save changes**.
19. Wait up to five minutes. Your phone should get an alert that the site is down.
20. Tap **Acknowledge** in the app.
21. Change the URL back to `https://staging.spanish-civil-war-quiz.pages.dev/` and click **Save changes**.
22. Tell Claude "the alert arrived", with the time it arrived.

When the real domain exists, create a second monitor for it the same way.

## Part 7: Stronger sign-in on your accounts

These accounts can change or take over the site, so each needs more than a password.

GitHub:

1. Click your profile picture at the top right of github.com, then click **Settings**.
2. In the left sidebar, click **Password and authentication**.
3. Under "Passkeys", click **Add a passkey** and follow your device's prompts (fingerprint, face or PIN).
4. Under "Two-factor authentication", if it says it is off, click **Enable two-factor authentication** and follow the steps.
5. When GitHub shows recovery codes, click **Download** and keep the file somewhere safe that is not this computer.

Cloudflare:

6. Click the person icon at the top right of the Cloudflare dashboard, then click **My Profile**.
7. Click **Authentication**.
8. Under "Two-Factor Authentication", click **Set up** and follow the steps. Choose **Security key** if you have a passkey or hardware key; otherwise choose an authenticator app.
9. Save the backup codes somewhere safe.

Sentry and Better Stack:

10. In each, open your account settings, find **Security** or **Two-factor authentication**, and turn it on.

Tell Claude "accounts are secured" so the launch checklist can be updated.

---

## Still to decide

These came up in docs/ARCHITECTURE.md and are not settled yet:

- **The domain name.** Nothing can go to production until `siteUrl` in `config/site.production.json` is a real domain.
- **A second admin and an alert backup.** The checklist asks for two admins on every account and a backup person for alerts. Name someone, or tell Claude you accept the risk as a team of one.
