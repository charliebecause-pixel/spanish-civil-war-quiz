# 0001: A static site with no accounts and no database

Date: 2026-11-16. Approved by Solrac.

## Context

The project brief's form answers describe a business app with sign-in, a database, enterprise buyers and support staff. Its written description describes one page with one question, and says visitors do not enter any data.

## Decision

Build what the description says: a static website. No visitor accounts, no database, no email, and the answer a visitor clicks is never sent or stored. The stack is Astro (static output) on Cloudflare Pages.

## Reason

Nothing in the product needs to remember anything. Not storing data removes most of the legal exposure the brief raises (children's data, political opinions as sensitive data under GDPR) and most of the cost and upkeep.

## Consequences

- Launch-checklist items about databases, sign-in, backups and migrations are closed as "Not applicable", with this decision as the reason.
- The database and sign-in rules in CLAUDE.md are dormant. If accounts or stored data are ever proposed, this decision must be revisited first.
