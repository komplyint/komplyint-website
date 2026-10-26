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

## Evidence status
This document describes the implementation, not an automatic PASS. Record the immutable CI run and inspected PDF render artifacts before accepting this batch. An automated text comparison proves correspondence, not independent native-speaker approval or legal review.
