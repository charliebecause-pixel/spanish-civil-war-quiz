# 0004: How human review works with one person

Date: 2026-11-16.

## Context

The brief requires a human review from Solrac on changes to infrastructure, CI and anything touching ads or data. The architecture said this would be enforced with a CODEOWNERS file and required approvals.

GitHub does not let anyone approve their own pull request. Coding agents push from Solrac's own account, so Solrac is the author of every pull request and could never approve one. Required approvals would block every merge.

## Decision

- The `main` branch rule requires a pull request and requires all three CI jobs to pass. It requires zero approvals.
- Solrac is the only person who can merge. Reading the diff and pressing Merge is the human review.
- There is no CODEOWNERS file yet.

## Reason

It gives the control the brief wants (nothing reaches `main` without CI passing and Solrac deciding) without a rule that cannot be satisfied.

## Revisit when

A second trusted person or a separate bot account joins. Then add CODEOWNERS for `.github/`, `config/`, `functions/` and `src/lib/security-headers.ts`, and require one approval.
