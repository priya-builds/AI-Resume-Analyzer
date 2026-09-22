"""
Quick integration test for Flask API endpoints.
"""
import sys
import os
import requests

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8')

BASE_URL = "http://127.0.0.1:5000"
PROJECT_ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
SAMPLE_DIR = os.path.join(PROJECT_ROOT, "sample_resumes")
PDF_PATH = os.path.join(SAMPLE_DIR, "sample_resume.pdf")

def test_health():
    print("Testing GET /api/health...")
    r = requests.get(f"{BASE_URL}/api/health")
    print(f"Status: {r.status_code}, Response: {r.json()}")
    assert r.status_code == 200
    assert r.json().get("status") == "healthy"
    print("Health check OK!")

def test_missing_file_validation():
    print("Testing POST /api/analyze-resume without file...")
    r = requests.post(f"{BASE_URL}/api/analyze-resume")
    print(f"Status: {r.status_code}, Response: {r.json()}")
    assert r.status_code == 400
    assert r.json().get("success") is False
    print("Missing file validation OK!")

def test_invalid_extension():
    print("Testing POST /api/analyze-resume with invalid file type (.txt)...")
    files = {'resume': ('test.txt', b'This is a test resume content', 'text/plain')}
    r = requests.post(f"{BASE_URL}/api/analyze-resume", files=files)
    print(f"Status: {r.status_code}, Response: {r.json()}")
    assert r.status_code == 400
    assert "Unsupported file type" in r.json().get("error", "")
    print("Invalid extension validation OK!")

def test_upload_sample_pdf_prompt():
    print("Testing POST /api/analyze-resume with sample_resume.pdf...")
    with open(PDF_PATH, "rb") as f:
        files = {'resume': ('sample_resume.pdf', f, 'application/pdf')}
        data = {'job_description': 'Looking for a Full Stack Developer with Python and React.'}
        r = requests.post(f"{BASE_URL}/api/analyze-resume", files=files, data=data)
    print(f"Status: {r.status_code}, Response: {r.json()}")
    # When GEMINI_API_KEY is not configured, it returns 500 with user-friendly guidance
    assert r.status_code in [200, 500]
    if r.status_code == 500:
        assert "GEMINI_API_KEY" in r.json().get("error", "")
        print("Upload & extraction succeeded, Gemini API key prompt verified!")
    else:
        assert r.json().get("success") is True
        print("Upload & Gemini analysis completely succeeded!")

def test_upload_sample_docx_prompt():
    docx_path = os.path.join(SAMPLE_DIR, "sample_resume.docx")
    print("Testing POST /api/analyze-resume with sample_resume.docx...")
    with open(docx_path, "rb") as f:
        files = {'resume': ('sample_resume.docx', f, 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')}
        data = {'job_description': 'Senior Python and React Full Stack Developer'}
        r = requests.post(f"{BASE_URL}/api/analyze-resume", files=files, data=data)
    print(f"Status: {r.status_code}, Response: {r.json()}")
    assert r.status_code in [200, 500]
    if r.status_code == 500:
        assert "GEMINI_API_KEY" in r.json().get("error", "")
        print("DOCX Upload & extraction succeeded, Gemini API key prompt verified!")
    else:
        assert r.json().get("success") is True
        print("DOCX Upload & Gemini analysis completely succeeded!")

if __name__ == "__main__":
    test_health()
    test_missing_file_validation()
    test_invalid_extension()
    test_upload_sample_pdf_prompt()
    test_upload_sample_docx_prompt()
    print("All integration API checks passed successfully!")
