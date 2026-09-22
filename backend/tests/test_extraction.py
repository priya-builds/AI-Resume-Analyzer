"""
Test script for resume text extraction service.
"""
import sys
import os

# Add backend directory to path
BACKEND_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, BACKEND_DIR)
if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

from services.extractor import extract_text_from_pdf, extract_text_from_docx

SAMPLE_DIR = os.path.join(os.path.dirname(BACKEND_DIR), "sample_resumes")
PDF_PATH = os.path.join(SAMPLE_DIR, "sample_resume.pdf")
DOCX_PATH = os.path.join(SAMPLE_DIR, "sample_resume.docx")


def test_pdf_extraction():
    print("Testing PDF extraction...")
    with open(PDF_PATH, "rb") as f:
        bytes_data = f.read()
    text = extract_text_from_pdf(bytes_data)
    assert len(text) > 50, "PDF extracted text is too short!"
    assert "Alex Morgan" in text, "Name not found in PDF extracted text!"
    assert "NovaCloud" in text, "Experience not found in PDF extracted text!"
    print(f"✅ PDF extraction passed ({len(text)} characters extracted).")


def test_docx_extraction():
    print("Testing DOCX extraction...")
    with open(DOCX_PATH, "rb") as f:
        bytes_data = f.read()
    text = extract_text_from_docx(bytes_data)
    assert len(text) > 50, "DOCX extracted text is too short!"
    assert "Alex Morgan" in text, "Name not found in DOCX extracted text!"
    assert "NovaCloud" in text, "Experience not found in DOCX extracted text!"
    print(f"✅ DOCX extraction passed ({len(text)} characters extracted).")


if __name__ == "__main__":
    test_pdf_extraction()
    test_docx_extraction()
    print("🎉 All text extraction tests passed successfully!")
