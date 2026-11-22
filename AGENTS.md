# Owner policy supersession — effective 2026-11-18

**OWNER-REVIEW-OPTIONAL-2026-11-18:** An independent human code reviewer, reviewer assignment, and a separate reviewer approval are **NOT mandatory** for implementation, PR merge or software deployment. The project agent/authorized maintainer must conduct direct technical review and complete the applicable tests, security/privacy checks, exact-SHA build, release evidence and rollback verification. An independent peer review is optional if expressly wanted, never a standing blocker.

This supersedes *only* older mandatory independent code-review rules anywhere below or elsewhere in this repository. It does **not** waive legal/regulatory/institutional approvals, signed exam/trading authority, security boundaries, CI/testing requirements, existing GitHub protected-branch controls, or approved project acceptance criteria. Do not fake reviews, bypass protected rules or call incomplete tests passed. Continue source/provenance accounting and ship qualified features promptly.

Canonical portfolio policy: https://github.com/galapoto/Projects/blob/main/docs/governance/OWNER_REVIEW_OPTIONAL_2026_11_18.md

---

# Repository development instructions

Preserve existing approval, privacy, security and release controls. This file grants no access to other repositories or production resources.

## REA-FIRST-001 — owner P0 reuse-first mandate (29 October 2026)

**MANDATORY for all future approved feature work, website/webapp/API design, software architecture, security architecture, tests and substantial refactoring.** Before coding, inspect existing first-party source/history and licensable upstream implementations, then make and record an REA suitability decision for any comparable authorized app, executable, website, API recording or binary. Consult the [ObumDelivery canonical directive](https://github.com/obumai/obum-delivery/blob/main/docs/REA_FIRST_MANDATORY_REUSE_STANDARD.md) and [decision/evidence template](https://github.com/obumai/obum-delivery/blob/main/docs/REA_REUSE_DECISION_TEMPLATE.md) where accessible.

**Use REA where applicable:** Prefer static/read-only analysis of authorized examples; use its CLI/MCP/browser/JavaScript/native/recorded-API evidence to recover behavior, interfaces, architecture and test cases. Record `REA_APPLIED`, `REA_NOT_APPLICABLE` or `REA_BLOCKED`, with target permission, exact source/version, evidence, unknowns and reasons. Not-applicable is a legitimate documented outcome; an unavailable REA dependency must not indefinitely halt a small useful release.

**Reuse maximally, build minimally:** (1) reuse fit-for-purpose, appropriately licensed code as-is; (2) clean and adapt it; (3) extend only missing functionality; (4) implement remaining code independently with tests. Reuse up to 100% of *relevant, permitted* code, never blindly copy entire projects. REA's own MIT license does not license third-party programs it inspects. Do not copy protected source/assets, bypass controls, import unsafe dependencies or use unanalyzed binaries in production.

**Required proof every run/PR:** plan and baseline SHA; reuse candidates and exact paths/licenses; REA status, tool revision, permitted target, observed evidence and limitations; reused/cleaned/adapted versus new code; executable feature and negative/security tests; actual CI/deploy evidence; measured engineering time with comparable baseline or `savings=unknown`; DONE / IN PROGRESS / NOT STARTED / BLOCKED. Recovered pseudocode, generated code or a green static scan alone never proves user-visible capability.

**Existing authority prevails:** Preserve this repo's stricter security/privacy, protected branch, project-plan/Director GO, independent owner, cost, scope, CI and release controls. This instruction grants no cross-repository write permission, credentials, live trading, real-exam inspection, unauthorized reverse engineering or production deployment. ObumDelivery/Woodpecker remains the authoritative CI where already designated. This is a mandatory engineering-method rule, **not proof that REA is installed or CI enforcement is deployed**.

## FEATURE-FIRST-001 — immediate user-visible per-feature delivery (owner directive 2026-11-04)

**MANDATORY standing rule:** Develop the smallest complete user outcome, with beautiful product-specific UI, real backend/data flow as needed, access controls, failure/retry, meaningful tests, recoverability and a working entry in the ObumAI launcher/sidebar (plus native product navigation) for authorized users. **Ship each independently qualified feature as soon as its own approved checks pass; never accumulate ready features while waiting for a full application, unrelated milestones or a redesign.** Bootstrap every new application with a release route and UI shell alongside its first useful feature. For shared non-UI libraries, prove actual adoption by a real consumer instead of inventing a tile.

Use the canonical [FEATURE-FIRST-001 standard](https://github.com/obumai/obum-delivery/blob/main/docs/FEATURE_FIRST_001_STANDARD.md) and [feature contract](https://github.com/obumai/obum-delivery/blob/main/templates/FEATURE_FIRST_001_FEATURE_CONTRACT.yaml). Declare `SOURCE_READY`, `CI_QUALIFIED`, `STAGED`, `DEPLOYED_DARK`, `RELEASED`, `USER_VERIFIED` honestly; only `USER_VERIFIED` is **SHIPPED**, based on actual deployed artifact/role-appropriate UI journey and recovery evidence. Use current native Woodpecker/ObumDelivery where designated, trusted promotion, REA-FIRST reuse, product-specific boundaries and existing security/Director/approval/incident holds. This is an owner policy, **not automatic CI enforcement or blanket production/deploy authorization**. On blocked releases, report the precise missing proof, owner and next action; do not label invisible, disabled, mock or draft-only code as shipped.

## LEAN-REA-FLOW-001 — mandatory lean reuse, flow-first UX and proof after every run (7 Nov 2026)

Before writing fresh code, examine the exact existing source and suitable authorized upstream donors; **show each donor project/repository URL, pinned SHA, copied original file, sanitized/adapted destination, what was adopted into the real runtime, and why any remaining original code was necessary**. Distinguish actual code copying from an interface wrapper, a fake SDK, a design inspiration or research. If nothing was copied, say **"Copied: none"** with the reason. Reuse the smallest component; keep architecture, runtime, dependencies and bundle light; avoid parallel engines and unnecessary abstractions. Measure footprint/performance differences or write **NOT_MEASURED**.

Prefer **action-oriented visual flows** and progressive disclosure to heavy explanatory text: a clear primary action, honest clickable cards, minimal microcopy, responsive light/dark accessible UI, real results and failure states. At the end of **every run**, publish source/donor evidence, reuse vs sanitized vs new files, size/dependency delta, before/after user flow, actual test/CI state, exact PR/SHA, and **user-verified usable features with real route/launcher evidence (or NONE VERIFIED)**. Preserve **FEATURE-FIRST-001**, **REA-FIRST-001**, all stricter legal/security/independent review/deployment rules. No policy-only commit is evidence of a shipped feature or automatically enforced CI.

Canonical: https://github.com/obumai/obum-delivery/blob/main/docs/LEAN_REA_FLOW_001_STANDARD.md
Receipt: https://github.com/obumai/obum-delivery/blob/main/templates/LEAN_REA_FLOW_001_RUN_RECEIPT.md

## TYPE-TASTE-UI-2026-11-19 — Design, font and typography skills
For UI or user-facing copy changes, read https://github.com/galapoto/Projects/blob/main/docs/governance/TYPE_TASTE_UI_2026_11_19.md and apply the relevant pinned Web Typography, Font Pairing, Apple HIG, Emil Kowalski, Impeccable, Taste and UI-UX Pro Max techniques. Record actual skill use, legally reusable sources/versions, accessibility, dark/light and responsive behavior, tests, and released user outcome. REA and lawful reuse come first; ship the smallest qualified user feature promptly. **Independent peer review is OPTIONAL** under OWNER-REVIEW-OPTIONAL-2026-11-18. Preserve existing stronger security, approval, CI, legal and release rules. Non-UI modules mark visual criteria NOT_APPLICABLE.


## ADMIN-01 transfer to existing Komplyint implementation agent — 2026-11-22

The owner has requested that the **existing** Komplyint website/business implementation agent take over the current admin-only website and FounderOS adaptation work. **Do not create a new agent.** First read `docs/ADMIN_01_AGENT_HANDOFF_2026_11_22.md`, `docs/PRIVATE_ADMIN_WORKSPACE.md`, existing `issues/24` and draft `pull/23`. The canonical source/provenance and private-app handoff is in `galapoto/FounderOS-Adaptation` `docs/BIZ_01_ADMIN_01_IMPLEMENTATION_HANDOFF_2026_11_22.md` at the import feature branch, with issue #2 and PR #1. Preserve current CI, original FI/EN/SV public website, public Vercel publishing issue #7 and separate Tinyerg ownership. Continue with the exact source/build/role/release checks, no unsupported cross-repo writes or live Access claims. GitHub handoff notes do not automatically commission an unattended agent; it must acknowledge its scoped access and actual next executable task in the existing issues.
