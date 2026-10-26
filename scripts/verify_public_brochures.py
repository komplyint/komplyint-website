#!/usr/bin/env python3
"""C24/Q11: inspect and render all three public six-page portfolios.

Uses isolated PyMuPDF in GitHub Actions; not imported by the Next.js runtime.
Production publication and human image review remain separate gates.
"""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile

import pymupdf

ROOT = Path("public/downloads")
OUT = Path("document-preview")
FILES = [
    "Komplyint_Palveluesite_FI.pdf",
    "Komplyint_Service_Portfolio_EN.pdf",
    "Komplyint_Tjanstebroschyr_SV.pdf",
]
ARCHIVE = ROOT / "Komplyint_Service_Documents.zip"


def inspect_portfolio(filename: str) -> dict:
    source = ROOT / filename
    raw = source.read_bytes()
    if not raw.startswith(b"%PDF-") or len(raw) < 10_000:
        raise AssertionError(f"Missing or implausibly small PDF: {filename}")
    with pymupdf.open(stream=raw, filetype="pdf") as document:
        if document.needs_pass or len(document) != 6:
            raise AssertionError(f"Expected unencrypted six-page brochure: {filename}")
        page_records = []
        for index, page in enumerate(document, start=1):
            if page.rect.width < 200 or page.rect.height < 200:
                raise AssertionError(f"Malformed brochure page {filename}:{index}")
            text = page.get_text("text")
            if len(text.strip()) < 100:
                raise AssertionError(f"No meaningful selectable text on {filename}:{index}")
            scale = 950 / max(page.rect.width, page.rect.height)
            output = OUT / f"{source.stem}-{index:02d}.png"
            page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False).save(output)
            if output.stat().st_size < 1000:
                raise AssertionError(f"Rendered image too small: {output}")
            page_records.append({"page": index, "render": str(output), "selectable_characters": len(text)})
    return {"name": filename, "pages": len(page_records),
            "sha256": hashlib.sha256(raw).hexdigest(), "rendered_pages": page_records}


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    summary = [inspect_portfolio(name) for name in FILES]
    with ZipFile(ARCHIVE) as archive:
        if sorted(archive.namelist()) != sorted(FILES):
            raise AssertionError("ZIP does not contain exactly the FI, EN and SV brochures")
        bad = archive.testzip()
        if bad is not None:
            raise AssertionError(f"ZIP corruption in {bad}")
        for name in FILES:
            if archive.read(name) != (ROOT / name).read_bytes():
                raise AssertionError(f"ZIP bytes differ from original brochure {name}")
    result = {
        "schema": "komplyint-brochures-c24.v1",
        "result": "PASS",
        "pdf_count": len(summary),
        "page_count": sum(item["pages"] for item in summary),
        "zip_verified": True,
        "folios": summary,
        "human_visual_review": "NOT_TESTED",
        "production_publication": "NOT_TESTED",
    }
    (OUT / "brochure-render-report.json").write_text(
        json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(json.dumps({key: result[key] for key in ("result", "pdf_count", "page_count", "zip_verified")}))
    print(f"Preserved {result['page_count']} real page images in {OUT}")


if __name__ == "__main__":
    main()
