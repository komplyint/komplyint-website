#!/usr/bin/env python3
"""Extract a source-traceable acceptance inventory from the actual 191-page handbook.

Requires pdfplumber only in the author's offline import environment:
    python -m pip install pdfplumber
    python scripts/import_handbook_pdf.py /path/to/Komplyint_Redesign_Handbook.pdf \
        --output docs/handbook-detailed-acceptance.json

This is an **import** of native PDF ruled-table rows and Cxx-Txx tests.
Do not convert imported NOT_TESTED entries into approval or pretend that the
remaining 35 unaccounted-for source obligations have been reconciled.
The production Next.js application does not use pdfplumber.
"""
import argparse
import hashlib
import json
import re
from collections import Counter
from pathlib import Path

KNOWN_PDF_SHA256 = "fa3b42f584f9fe79448f9a335b3fd0f81c6171fc5cacbc020b7f15589d233951"
DECLARED_ENTRIES = 1517
EXPECTED_SPEC_UNITS = 170
EXPECTED_COMPONENT_TESTS = 225
EXPECTED_TABLE_ROWS = 1257


def combine_words(words):
    lines = {}
    for word in words:
        row = round(word["top"] / 2) * 2
        lines.setdefault(row, []).append(word)
    return " ".join(
        " ".join(w["text"] for w in sorted(lines[at], key=lambda item: item["x0"]))
        for at in sorted(lines)
    ).strip()


def extract(pdf_path):
    import pdfplumber  # Offline import-only dependency, not a website runtime dependency

    result, seen_units = [], set()
    with pdfplumber.open(pdf_path) as source:
        if len(source.pages) != 191:
            raise ValueError(f"Expected the v1.0 191-page handbook, got {len(source.pages)} pages")
        for page_index, page in enumerate(source.pages):
            printed_page = page_index + 1
            heading = page.crop((0, 44, page.width, 125)).extract_text() or ""
            match = re.search(r"(?m)^([FCPT EQR]\d{2}) / \d{2} /", heading)
            if not match:
                continue
            unit = match.group(1)
            seen_units.add(unit)
            rules = sorted(set(
                round(line["top"], 2) for line in page.lines
                if abs(line["y0"] - line["y1"]) < 0.4
                and line["x1"] - line["x0"] > 400
                and 130 < line["top"] < 700
            ))
            words = page.extract_words(x_tolerance=1.8, y_tolerance=2.8)
            header_words = [word for word in words if 135 < word["top"] < (rules[0] if rules else 180)]
            second_col = next((word["x0"] for word in header_words if word["x0"] > 110), 145)
            if second_col > 245:
                second_col = 145
            row_number = 0
            for i in range(1, len(rules)):
                top, bottom = rules[i - 1], rules[i]
                row_words = [
                    word for word in words
                    if top + 0.1 <= word["top"]
                    and word["bottom"] <= bottom + 2
                    and word["x0"] < 550
                ]
                label = combine_words([word for word in row_words if word["x0"] < second_col - 5])
                description = combine_words([word for word in row_words if word["x0"] >= second_col - 5])
                if label and description:
                    row_number += 1
                    result.append({
                        "id": f"{unit}-R{row_number:02d}",
                        "unit_id": unit,
                        "source_page": printed_page,
                        "kind": "table_requirement",
                        "label": label,
                        "text": description,
                        "result": "NOT_TESTED",
                        "evidence": [],
                    })
            body = page.extract_text(layout=False)
            test_pattern = re.compile(r"(?m)(C\d{2}-T\d{2})\s*\|\s*")
            acceptance = list(test_pattern.finditer(body))
            for index, found in enumerate(acceptance):
                if not found.group(1).startswith(unit + "-"):
                    raise ValueError(f"Acceptance ID {found.group(1)} on unrelated page {unit}")
                end = acceptance[index + 1].start() if index + 1 < len(acceptance) else len(body)
                text = body[found.end():end]
                text = re.split(
                    r"(?:Inherits the global foundation|Visual reference:|References:|\nCONTENTS\s*\|)",
                    text,
                )[0]
                text = " ".join(text.split()).strip()
                result.append({
                    "id": found.group(1),
                    "unit_id": unit,
                    "source_page": printed_page,
                    "kind": "explicit_acceptance_test",
                    "label": "Acceptance test " + found.group(1),
                    "text": text,
                    "result": "NOT_TESTED",
                    "evidence": [],
                })
    by_kind = Counter(record["kind"] for record in result)
    ids = [record["id"] for record in result]
    if len(seen_units) != EXPECTED_SPEC_UNITS:
        raise ValueError(f"Unit extraction drift: {len(seen_units)} != {EXPECTED_SPEC_UNITS}")
    if len(ids) != len(set(ids)):
        raise ValueError("Duplicate acceptance IDs in extracted source")
    if by_kind["table_requirement"] != EXPECTED_TABLE_ROWS:
        raise ValueError(f"Ruled-table extraction drift: {by_kind['table_requirement']} != {EXPECTED_TABLE_ROWS}")
    if by_kind["explicit_acceptance_test"] != EXPECTED_COMPONENT_TESTS:
        raise ValueError(f"Component tests mismatch: {by_kind['explicit_acceptance_test']} != {EXPECTED_COMPONENT_TESTS}")
    for record in result:
        if not record["text"] or not 1 <= record["source_page"] <= 191:
            raise ValueError("Source-less or empty entry " + record["id"])
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("pdf",type=Path,help="Locally available original handbook PDF")
    parser.add_argument("--output",type=Path,default=Path("docs/handbook-detailed-acceptance.json"))
    arguments = parser.parse_args()
    original = arguments.pdf.read_bytes()
    fingerprint = hashlib.sha256(original).hexdigest()
    if fingerprint != KNOWN_PDF_SHA256:
        raise SystemExit(
            "Source PDF SHA256 differs from the audited v1.0 handbook; "
            "reconcile the new revision and update the importer before running."
        )
    entries = extract(arguments.pdf)
    unresolved = DECLARED_ENTRIES - len(entries)
    if unresolved < 0:
        raise ValueError("Extracted obligations exceed the handbook's claimed entry count")
    inventory = {
        "schema_version": "handbook-detailed-acceptance.v1",
        "source": "Komplyint Redesign Handbook v1.0",
        "source_pdf_sha256": fingerprint,
        "source_pages": 191,
        "declared_entries": DECLARED_ENTRIES,
        "extracted_entries": len(entries),
        "unmapped_entries": unresolved,
        "extraction_method": "Source PDF native ruled-table rows and explicit component acceptance tests; remaining obligations need reconciliation.",
        "imported_as": "NOT_TESTED",
        "entries": entries,
    }
    arguments.output.parent.mkdir(parents=True,exist_ok=True)
    arguments.output.write_text(json.dumps(inventory,ensure_ascii=False,indent=2)+"\n",encoding="utf-8")
    print(json.dumps({
        "source_sha256": fingerprint,
        "source_pages": 191,
        "extracted_entries": len(entries),
        "table_rows": EXPECTED_TABLE_ROWS,
        "component_acceptance_tests": EXPECTED_COMPONENT_TESTS,
        "still_unmapped": unresolved,
        "result": "SOURCE_EXTRACTED_UNATTESTED",
        "output": str(arguments.output),
    },indent=2))


if __name__ == "__main__":
    main()
