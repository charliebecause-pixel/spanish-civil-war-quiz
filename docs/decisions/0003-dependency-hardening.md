# 0003: How dependencies are installed and kept safe

Date: 2026-11-16.

## Context

The brief asks for a 3-day wait before adopting new package versions, committed lockfiles, and protection against install-script attacks such as the Shai-Hulud npm worm.

## Decision

These are settings, not habits. They live in `pnpm-workspace.yaml` and CI:

| Rule | Where it is enforced |
| --- | --- |
| No package version younger than 3 days | `minimumReleaseAge: 4320` (minutes). pnpm refuses to resolve anything newer. |
| A package may not lose its publishing trust level between releases | `trustPolicy: no-downgrade` |
| Dependencies may not run install scripts | pnpm blocks them by default. `allowBuilds` lists the two packages that asked (esbuild, workerd), both denied. |
| CI installs exactly the lockfile | `pnpm install --frozen-lockfile` |
| The pnpm version itself is pinned | `packageManager` in package.json |
| Update proposals also wait 3 days | `cooldown` in `.github/dependabot.yml` |
| Known vulnerabilities fail the build | OSV-Scanner job in CI, on every pull request and weekly |
| Third-party CI actions cannot change under us | Every `uses:` line is pinned to a full commit hash |

## Reason

A rule written only in a document gets forgotten. A rule in configuration fails loudly.

## Notes

- `overrides` in `pnpm-workspace.yaml` forces a patched version when a dependency still asks for a vulnerable one. Each entry says when it can be deleted.
- Every direct dependency and why it is here is listed in the pull request that added it.
