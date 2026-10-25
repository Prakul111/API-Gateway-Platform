---
name: decisions-and-docs
description: Protocol for reading and recording architectural decisions, RFCs, bug reports, improvements, and changelogs.
always_on: true
---

# Decision and Documentation Protocol

This repository maintains an in-repo source of truth under `docs/` for all architectural discussions, technical decisions, RFCs, bugs, tech debt improvements, and changelogs.

Whenever you work on this codebase (whether autonomously or guided by the user), follow these rules:

---

## 1. Before Proposing or Modifying Architecture

- Always check `docs/adr/` for existing architectural decision records before designing or introducing changes to schemas, routing, caching, rate limiting, state management, or dependencies.
- Honor existing Accepted ADRs. If a requested change contradicts an accepted ADR, discuss this with the user and propose a new superseding ADR (e.g. `docs/adr/0002-....md`).

## 2. When Making Significant Architectural Decisions

- Whenever you make or propose a major technical choice (e.g., database selection, cache engine, API gateway routing pattern, auth flow), draft a new ADR using `pnpm new:adr "<Title>"` (or copy `docs/adr/0000-template.md`).
- Document:
  - Context and problem statement
  - Considered options & tradeoffs
  - Decision outcome & rationale
  - Author attribution (mark whether Human or AI Agent)

## 3. When Designing New Features (RFCs)

- For substantial new subsystems, draft a feature specification in `docs/rfc/` using `pnpm new:rfc "<Feature Name>"`.
- Include architecture diagrams (Mermaid), TypeScript interfaces, error handling, and rollout plans.

## 4. When Resolving Non-Trivial Bugs

- For regressions, concurrency issues, edge-case panics, or security flaws, document a root-cause analysis (RCA) in `docs/bugs/` using `pnpm new:bug "<Bug Name>"`.
- Include the symptom, reproduction steps, RCA, fix details, and automated prevention action items.

## 5. When Refactoring or Optimizing Performance

- For performance optimizations (including outputs from `vercel-optimize`), benchmark baseline numbers and document goals in `docs/improvements/` using `pnpm new:improvement "<Improvement Name>"`.

## 6. When Delivering Features or Fixes (Changelogs)

- When a code change modifies apps or packages, add a changeset entry via `pnpm changeset` or by creating `.changeset/<unique-name>.md` detailing:
  - Packages affected (`web`, `docs`, `@repo/ui`, etc.)
  - SemVer bump: `patch`, `minor`, or `major`
  - Concise summary of the change
