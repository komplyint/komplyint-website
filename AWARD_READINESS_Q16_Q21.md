# Komplyint Oy — competition-quality release and jury rehearsal

Handbook baseline: Komplyint Redesign Handbook, F04 and Q16–Q21. This report covers **implementation process**, not an award or an external judgment.

## F04 — Evaluation lenses
Use the handbook's internal Awwwards-oriented weighting:
- Design 40%: editorial composition, original design language, responsive typography, spacing, visible states.
- Usability 30%: find a service, compare options, submit an enquiry, use keyboard and assisted technology.
- Creativity 20%: distinctive folded-plane motif, native motion and coherent expression without gimmicks.
- Content 10%: verified company information, precise scope, no fictional testimonials.

Webby independent lenses: content, structure/navigation, visual design, functionality, interactivity, innovation, overall experience.
Published references:
- https://www.webbyawards.com/judging-criteria/
- https://www.webbyawards.com/reviewer-guidelines/
- https://www.awwwards.com/academy/

The percentages are **handbook internal**, not a false Webby judging formula.

## Q16 — Human and automated design review
Independent reviewer #1 (art direction): **PENDING ASSIGNMENT**.
Independent reviewer #2 (accessibility / engineering): **PENDING ASSIGNMENT**.
Business owner acceptance: **PENDING**.
AI/automated review: see CI artifact \`site-preview/award-review-evidence.json\`.
Do not show an award badge or represent any rubric score as external judgment.

### Jury rehearsal scorecard, manually entered by actual reviewer
Scores: 1 broken; 2 inconsistent; 3 solid; 4 refined; 5 exceptional with evidence.
| Criterion | Score | Evidence | Reviewer | Decision |
| --- | --- | --- | --- | --- |
| Art direction | Not scored | Pending staged review | Pending | Not reviewed |
| Navigation/usability | Not scored | Scripted journey, actual user study pending | Pending | Not reviewed |
| Creativity | Not scored | Original folded graphic source in components | Pending | Not reviewed |
| Content | Not scored | Bilingual texts, factual company fields | Pending | Not reviewed |
| Engineering | Not scored | CI tests and audit evidence, if passed | Pending | Not reviewed |
| Overall experience | Not scored | Desktop/mobile/browser screenshots | Pending | Not reviewed |

## Q17 — Severity and release policy
**P0** exposure/data loss/site unavailable: do not release.
**P1** broken contact delivery, inoperable services or severe accessibility defect: do not release.
**P2** visual consistency, typography or interaction weakness: resolve before competition submission.
**P3** polish defects: review and document.

Never convert a NOT TESTED record to PASS. Field CWV performance needs real-world data and must not be inferred from synthetic Lighthouse values.

## Q18 — Evidence schema
Each execution result records:
- requirement_id
- handbook/specification version
- immutable SHA and tested environment
- route, language, viewport, theme, browser, motion preference
- method/script, result and severity
- evidence artifact pointer, reviewer and date
- any deviation, required follow-up and final release decision

The \`tests/award-audit.mjs\` produces a machine-readable evidence artifact for selected checks.
The full 1,517-entry register remains in the downloadable handoff archive, with all unexecuted entries NOT TESTED.
**Automation is not equivalent to executing every applicable manual test.**

## Q19 — Originality/provenance review
- Protected originals: \`public/logo.svg\`, \`public/media/hero.mp4\`, \`public/media/hero.webp\`.
- New HTML/CSS vector motif: \`src/components/ServiceDetail.tsx\` and \`src/app/handbook.css\`.
- Layout/tabs adapted using common accessible interaction patterns from shadcn/ui and Radix.
- No claim of exclusive font design: EB Garamond and Lato are existing type families.
- Reviewer should mask the logo from screenshots and evaluate whether typography, colour and spatial grammar still feel recognisably Komplyint.
- Owner/design reviewer should approve the new original CSS/SVG art before competition submission.

## Q20 — Deliverable-based release phases
1. Foundation: shared content, tokens, preserved logo and video, theme, route map.
2. Commercial journey: services, independent detail routes, Work/About, contact, privacy and accessibility.
3. Quality: tests on FI/EN, mobile, colour themes, keyboard, motion, video, form states, failures.
4. Independent review and owner signoff.
5. Deploy, independently verify public site and mail inbox delivery, attach immutable evidence.
6. Submit only after confirming category, fee, deadline and site eligibility.

**No phase is complete solely because its code exists.**

## Q21 — Submission package inventory
- Public production URL + final immutable commit
- Website overview, audience, reason for the service finder, distinctive art direction
- Protected original logo/video provenance and original graphic source files
- Desktop/mobile FI/EN screenshots at approved widths
- Keyboard and accessibility report; unresolved findings
- Browser/device matrix; motion/video pass; page and contact flow proof
- Performance report (lab and field distinguished); media weight budget
- Copy/claims verification; absence of fictional references
- Independent critique/owner sign-off, actual scores
- Selected award, category, eligibility, fee confirmation and current deadlines
- No fake badges, no cloaking or judge-specific content

### Current state
The engineering redesign and responsive/video/navigation tests have been merged to main. As of 25 October 2026, the public domain still served the older design and the new service/document URLs returned 404; the hosting link is unresolved. Independent jury-style human reviews, owner approval, actual email inbox receipt and any award submission are **not complete**. Use the public /api/release contract and release-evidence.json before changing any production status to Done.

### Next review
Open the rendered public preview, review at 390px/768px/1440px for both languages, test the film moving (currentTime must increase), check service discoverability with actual users, then decide release or correction.
