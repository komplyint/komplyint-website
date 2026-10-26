# Language continuation: website-to-brochure copy parity

Date: 26 October 2026. Plan areas: F07/T12, C24, E12, Q11/Q18.

## Previous state
The website dictionaries had received the native-language editorial pass, but the six-page brochure builder still contained separate FI/EN copy and a separate Swedish JSON catalogue. Finnish pages could fall back to English SERVICE/DELIVERY labels. Website copy edits did not trigger the brochure builder.

## Implemented
Reuse the existing website commercial and UI dictionaries, TypeScript build dependency, six-page ReportLab portfolio, public PDF names, ZIP handover and existing PDF rendering verifier. A build-only exporter compiles the actual dictionaries, exports all 18 service records and 12 process steps, and fingerprints the four source files. The renderer rejects a stale snapshot rather than silently printing old copy.

Brochure headers, business identifiers, section labels and PDF language metadata are localized. Titles and paragraphs wrap with explicit overflow guards. Service cards link to the corresponding language's service pages. Email links and the ZIP README are usable and localized; original site artwork and service scope are unchanged. PDFs and ZIP metadata are deterministic for unchanged inputs.

The build workflow now responds to website copy changes. It validates six pages per language, ZIP byte identity, rendered page output and 177 exact website phrases across FI/EN/SV before committing the four public downloads. It refuses to overwrite a concurrently advanced main branch. Live deployment is a separate verification step.

## New code versus reuse
New: canonical-copy exporter, PDF text-parity check and additional regression assertions. Adapted: the original ReportLab page functions and document workflow. Retired from the active path: duplicated brochure service prose and scripts/portfolio_sv.json. No new website runtime or translation API.

## Execution evidence
Implementation commit: ff95a601c879c182cd0bad293a57fcc2d0e32296. A visual review identified form-specific wording in an email-only PDF panel. Follow-up 735650b087a50aa9df80c6af27a7a1f9b40c31d1 reuses each language's contact invitation instead. The corrected build passed https://github.com/komplyint/komplyint-website/actions/runs/40270172331 and generated asset commit def18032a0cad316a06d3027e099e593d594121e.

Evidence artifact: komplyint-trilingual-brochure-visual-review, artifact 12627819040. It contains 18 page renders, the actual three PDFs/ZIP, the source-copy snapshot and copy-parity-evidence.json. All three languages passed 59 exact text checks each. Every PDF has six pages and nine link annotations. The 18-page overview and enlarged contact/service layouts were inspected; no clipping was found in those views. Programmatic text bounds also remained within all page rectangles. This is not independent human native-speaker approval.

## Release-copy verifier correction
The production verifier still demanded the superseded home, service, work and policy headings. Update its 16-page expectations to the reviewed FI/EN/SV copy and reject known pre-editorial homepage slogans. Add an actual-production-build HTTP check to the existing quality workflow. This runs the real public verifier against Next.js pages and media, rather than deriving both mock pages and expected text from the same stale constants. Its JSON output explicitly distinguishes CI production-build checks from public-domain publication.

Automated text comparison proves correspondence, not independent native-speaker approval or legal review. Production publication remains subject to the actual deployed commit and live-domain verification.
