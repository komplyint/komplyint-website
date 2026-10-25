# Original handbook — detailed source extraction and reconciliation

This audit is based on the **actual 191-page Komplyint Redesign Handbook v1.0**, not a remembered summary. The exact source SHA256 and import counts are recorded in `docs/handbook-extraction-audit.json`.

## Verified extraction inventory (26 October 2026)

| Source content | Count |
| --- | ---: |
| Book's declared top-level units | 170 |
| Book's declared acceptance/specification entries | 1,517 |
| Explicitly labeled Cxx-Txx component tests recovered | 225 |
| Distinct ruled-table requirement rows recovered | 1,257 |
| **Source-mapped items with PDF page, ID, text and NOT_TESTED status** | **1,482** |
| **Declared obligations not yet individually reconciled** | **35** |

The 35 are **not silently relabeled or invented**. The handbook contains some normative prose outside ruled tables and formal Cxx-Txx lines; those remaining source decisions must be reconciled individually by the accountable owner/reviewer before asserting 1,517/1,517 source coverage.

## Reproducible import

Reuse the existing handbook unit and C01–C64 test registries and run:

```bash
python -m pip install pdfplumber
python scripts/import_handbook_pdf.py /path/to/Komplyint_Redesign_Handbook.pdf --output docs/handbook-detailed-acceptance.json
```

The importer validates the known original SHA256, 191 pages, 170 sections, 225 named component tests, 1,257 ruled-table rows, unique IDs and non-empty text, then writes a machine-readable record for each entry. Each record starts `NOT_TESTED`. The generated result must be independently reviewed and incorporated into an approved source ledger; this report does **not** claim that the 1,482-item output is already committed into this repository.

The offline authoring importer uses `pdfplumber`. **No production Next.js application dependency** is created; the original protected public logo and film are unaffected.

## Acceptance and signoff

Do not mark any individual entry PASS merely because a test script exists or its source file is present. Q18 requires an immutable deployed commit, route/locale/theme/viewport/browser context, method, screenshot or test artifact, result, named reviewer and date. A 320px Chromium reflow check is not a signed NVDA/VoiceOver or 400%-browser-zoom result.

Production deployment, real email delivery, original-art review, human accessibility inspection, full 35-item reconciliation and final jury acceptance remain separate open gates.
