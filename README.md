# 🚀 AI Resume Analyzer (Full Stack Web Application)

A modern, beginner-friendly **AI Resume Analyzer** built with **React (Vite) + Tailwind CSS** on the frontend, a modular **Python Flask REST API** on the backend, and the official modern **Google GenAI SDK (`google-genai`)** powered by **Google Gemini 2.5**.

---

## 🌟 Key Features

- 📄 **Multi-Format Parsing**: In-memory text extraction from both **PDF (.pdf)** and **Word (.docx)** documents using `pypdf` and `python-docx`.
- ⚡ **Zero Database & Privacy First**: Resumes are parsed and analyzed purely in volatile memory. No documents or personally identifiable information are permanently stored on disk or in a database.
- 🤖 **Deep AI Analysis via Google Gemini**: Uses the official modern `google-genai` SDK with strict JSON schemas to deliver structured, recruiter-level diagnostics:
  - Overall Resume Score (0–100) with visual circular meter
  - Executive Professional Summary
  - Detected Technical and Soft Skills (grouped badges)
  - Work Experience, Projects, Education, and Certifications
  - Key Candidate Strengths & Critical Areas for Improvement
  - High-Impact Skills to Learn
  - Actionable Resume Improvement Suggestions
- 🎯 **Optional Job Match Scoring**: Paste a target job description to uncover:
  - Role match percentage (0–100%)
  - Directly matching skills
  - Missing skill gaps required by the JD
  - Relevant candidate experience highlights
  - Tailored job-specific application advice
- 🎨 **Modern Purple + White UI**: Fully responsive, drag-and-drop file upload, real-time file size & extension validation, step-by-step loading state animations, score confetti celebration, and a one-click reset button.

---

## 🏗️ System Architecture & Data Flow

```
+-------------------------------------------------------------------------------+
|                                  USER BROWSER                                 |
|                                                                               |
|  [ React 18 + Vite + Tailwind CSS ]                                           |
|  - Drag-and-Drop Resume Upload (.pdf / .docx)                                 |
|  - Optional Target Job Description                                            |
|  - Real-time client validation (5MB max limit, allowed formats)               |
+---------------------------------------+---------------------------------------+
                                        |
                 HTTP POST (multipart/form-data) to /api/analyze-resume
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                             FLASK BACKEND REST API                            |
|                                                                               |
|  1. app.py (CORS enabled, 5MB Max Content Length, Error Handlers)             |
|  2. routes/analyze.py (Validates file stream)                                 |
|  3. services/extractor.py (In-memory text extraction using pypdf & docx)      |
|  4. services/gemini_service.py (google-genai SDK, structured JSON prompt)     |
+---------------------------------------+---------------------------------------+
                                        |
                  API Call (gemini-2.5-flash with JSON MIME type)
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                            GOOGLE GEMINI 2.5 API                              |
|                                                                               |
|  - Semantic evaluation against industry recruitment benchmarks                |
|  - Computes candidate score, skill categorizations, and JD gap analysis       |
|  - Returns strictly formatted, valid JSON payload                             |
+---------------------------------------+---------------------------------------+
                                        |
                         Structured JSON Response
                                        |
                                        v
+-------------------------------------------------------------------------------+
|                             REACT DASHBOARD VIEW                              |
|                                                                               |
|  - ScoreGauge (SVG Circular Gauge + Confetti for scores >= 80)                |
|  - SkillsBadgeGroup (Technical & Soft Skills)                                 |
|  - JobMatchAnalysis (Matching vs Missing Badges, Gap Advice)                  |
|  - SectionCards (Summary, Experience, Projects, Education, Certifications)    |
|  - Actionable Improvement Suggestions & Strengths                             |
+-------------------------------------------------------------------------------+
```

---

## 📁 Project Directory Structure

```text
AI-Resume-Analyzer/
├── backend/
│   ├── app.py                     # Flask entry point, CORS & health endpoints
│   ├── requirements.txt           # Python dependencies
│   ├── .env.example               # Template for environment variables
│   ├── .env                       # Local environment variables (DO NOT COMMIT)
│   ├── routes/
│   │   ├── __init__.py
│   │   └── analyze.py             # POST /api/analyze-resume endpoint
│   ├── services/
│   │   ├── __init__.py
│   │   ├── extractor.py           # In-memory PDF & DOCX text extraction
│   │   └── gemini_service.py      # Official modern google-genai SDK integration
│   ├── utils/
│   │   ├── __init__.py
│   │   └── validators.py          # File type (.pdf, .docx) & size (5MB) validator
│   └── tests/
│       └── test_extraction.py     # Unit test for PDF and DOCX extraction
├── frontend/
│   ├── index.html                 # HTML shell with Inter typography
│   ├── package.json               # Frontend dependencies & scripts
│   ├── vite.config.js             # Vite config with backend API reverse proxy
│   ├── tailwind.config.js         # Custom Purple brand palette configuration
│   ├── postcss.config.js          # PostCSS Tailwind processing
│   └── src/
│       ├── main.jsx               # React DOM root mounting
│       ├── App.jsx                # Main application state and screen router
│       ├── index.css              # Tailwind base, utilities & custom scrollbars
│       ├── services/
│       │   └── api.js             # Backend REST API client
│       ├── components/
│       │   ├── Navbar.jsx         # Sticky header with backend status indicator
│       │   ├── FileUpload.jsx     # Drag-and-drop resume upload zone
│       │   ├── JobDescriptionInput.jsx # Optional JD textarea
│       │   ├── LoadingState.jsx   # Multi-step animated progress state
│       │   ├── ScoreGauge.jsx     # Circular SVG score gauge & confetti
│       │   ├── SkillsBadgeGroup.jsx # Grouped technical and soft skills badges
│       │   ├── SectionCard.jsx    # Reusable card container
│       │   └── JobMatchAnalysis.jsx # Job match score, matching & missing tags
│       └── pages/
│           └── Dashboard.jsx      # Complete analytics dashboard
├── sample_resumes/
│   ├── create_sample_resumes.py   # Generator script for test resumes
│   ├── sample_resume.docx         # Sample test Word document
│   └── sample_resume.pdf          # Sample test PDF document
└── README.md
```

---

## 🛠️ Prerequisites

Make sure you have the following installed on your machine:
- **Python**: Version 3.10 or higher (`python --version`)
- **Node.js**: Version 18 or higher (`node -v`)
- **npm**: Version 9 or higher (`npm -v`)
- **Google Gemini API Key**: Free key from [Google AI Studio](https://aistudio.google.com/)

---

## ⚙️ Installation & Setup

### 1. Backend Setup

1. Open a terminal and navigate to the `backend` directory:
   ```bash
   cd "C:\Users\Priya Nayak\OneDrive\Documents\AI-Resume-Analyzer\backend"
   ```

2. Create and activate a Python virtual environment:
   - **Windows (PowerShell)**:
     ```powershell
     python -m venv venv
     .\venv\Scripts\Activate.ps1
     ```
   - **Linux / macOS**:
     ```bash
     python3 -m venv venv
     source venv/bin/activate
     ```

3. Install the dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure your environment variables:
   - Copy `.env.example` to `.env`:
     ```bash
     cp .env.example .env
     ```
   - Open `.env` and paste your Gemini API key:
     ```env
     GEMINI_API_KEY=AIzaSyYourActualGeminiAPIKeyHere
     PORT=5000
     FLASK_ENV=development
     ```

5. Run the backend server:
   ```bash
   python app.py
   ```
   *The backend will start at `http://127.0.0.1:5000`.*

---

### 2. Frontend Setup

1. Open a **second terminal window** and navigate to the `frontend` directory:
   ```bash
   cd "C:\Users\Priya Nayak\OneDrive\Documents\AI-Resume-Analyzer\frontend"
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The frontend will run at `http://localhost:5173`.*

4. Open your browser and go to:
   **`http://localhost:5173`**

---

## 🔌 API Documentation

### 1. Health Check
- **Endpoint**: `GET /api/health`
- **Description**: Verifies that the Flask backend is running and confirms whether the Gemini API key is configured.
- **Sample Response**:
  ```json
  {
    "status": "healthy",
    "service": "AI Resume Analyzer API",
    "gemini_api_key_configured": true
  }
  ```

### 2. Analyze Resume
- **Endpoint**: `POST /api/analyze-resume`
- **Content-Type**: `multipart/form-data`
- **Request Parameters**:
  | Field | Type | Required | Description |
  |---|---|---|---|
  | `resume` | File (`.pdf` or `.docx`) | Yes | The candidate's resume (Max 5MB) |
  | `job_description` | Text string | No | Target job description for role matching |

- **Sample JSON Success Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Resume analyzed successfully.",
    "data": {
      "overall_score": 85,
      "summary": "Passionate Full Stack Software Engineer with hands-on experience in React, Python, and Flask...",
      "detected_skills": {
        "technical": ["Python", "React", "Flask", "PostgreSQL", "Docker", "AWS"],
        "soft": ["Problem Solving", "Agile Collaboration", "Communication"]
      },
      "education": [
        {
          "degree": "Bachelor of Science in Computer Science",
          "institution": "State University of Technology",
          "year": "2020 - 2024",
          "details": "GPA: 3.8/4.0"
        }
      ],
      "experience": [
        {
          "role": "Software Engineer Intern",
          "company": "NovaCloud Solutions",
          "duration": "June 2023 – Present",
          "highlights": [
            "Developed and deployed 6+ RESTful microservice endpoints using Python and Flask.",
            "Built responsive frontend dashboards in React and Tailwind CSS."
          ]
        }
      ],
      "projects": [
        {
          "name": "AI Content Assistant",
          "technologies": ["React", "Python", "Flask", "Gemini API"],
          "description": "Engineered a generative writing platform that drafts blog posts and summarizes documents."
        }
      ],
      "certifications": [
        "AWS Certified Cloud Practitioner (2024)",
        "Meta Certified Front-End Developer (2023)"
      ],
      "strengths": [
        "Strong full-stack foundation with proven API and UI project delivery",
        "Clear quantifiable metrics included in work experience bullets"
      ],
      "weaknesses": [
        "Could expand on test automation tools (e.g. Pytest, Jest)",
        "Portfolio website link could be highlighted"
      ],
      "suggested_skills": [
        "Kubernetes",
        "GraphQL",
        "CI/CD with Jenkins"
      ],
      "improvement_suggestions": [
        "Incorporate unit testing frameworks to emphasize code quality standards.",
        "Add a link to your live deployed projects on GitHub or Vercel."
      ],
      "job_match": {
        "is_provided": true,
        "match_percentage": 82,
        "matching_skills": ["React", "Python", "Flask", "REST APIs"],
        "missing_skills": ["Kubernetes", "Kafka"],
        "relevant_experience": ["Software Engineer Intern at NovaCloud Solutions"],
        "role_specific_advice": "Highlight your experience with distributed systems and asynchronous messaging."
      }
    }
  }
  ```

---

## 🧪 Testing Text Extraction Locally

You can test the in-memory text extraction for both `.pdf` and `.docx` using the pre-built test script:

```bash
cd backend
.\venv\Scripts\python tests/test_extraction.py
```

Expected Output:
```text
Testing PDF extraction...
✅ PDF extraction passed (1323 characters extracted).
Testing DOCX extraction...
✅ DOCX extraction passed (2356 characters extracted).
🎉 All text extraction tests passed successfully!
```

---

## ❓ Troubleshooting & Common Errors

| Issue | Cause | Solution |
|---|---|---|
| **"GEMINI_API_KEY is not configured"** | Missing API key in `backend/.env` | Create `backend/.env` file with `GEMINI_API_KEY=AIzaSy...` from Google AI Studio. |
| **"Unsupported file type"** | Uploaded file is not `.pdf` or `.docx` | Convert the resume to standard PDF or Microsoft Word (`.docx`) format. |
| **"File is too large. Maximum allowed size is 5MB"** | Uploaded file exceeds 5MB | Compress the PDF or remove embedded high-resolution graphics. |
| **"No readable text found in PDF"** | PDF is a scanned image or photo without embedded selectable text | Export the resume from Google Docs or MS Word directly as a PDF (text-based), or upload the `.docx` directly. |
| **"Cannot connect to backend server / Offline"** | Flask backend server is not running | Run `python app.py` inside the `backend` directory. Verify it is running on `http://127.0.0.1:5000`. |
| **CORS errors in browser console** | Cross-Origin Resource Sharing blocked | Flask-CORS is already configured in `backend/app.py`. Ensure requests hit `http://127.0.0.1:5000` or use the Vite proxy on `/api`. |

---

## 💼 How to Explain This Project in a Capgemini Interview

When asked: *"Walk me through your AI Resume Analyzer project,"* here is a structured, confident explanation you can deliver:

### 1. Elevator Pitch (30 Seconds)
> *"I built a full-stack **AI Resume Analyzer** web application using **React with Vite and Tailwind CSS** for the frontend, **Python Flask** for the REST backend, and the modern **Google GenAI SDK** powered by **Gemini 2.5**. It allows job seekers to upload resumes in PDF or DOCX format, optionally input a target job description, and receive an instant, recruiter-grade breakdown with an overall resume score, detected technical and soft skills, gap analysis, and tailored improvement suggestions."*

### 2. Architectural Highlights to Emphasize
1. **Separation of Concerns**:
   - The frontend handles UI state, drag-and-drop interactions, and dynamic SVG data visualization.
   - The Flask backend acts as a secure intermediary and never exposes the Gemini API key to the client browser.
2. **Stateless, In-Memory Processing & Privacy**:
   - *"We deliberately designed this system without a permanent database. Resumes contain sensitive Personally Identifiable Information (PII). By extracting text directly in volatile RAM using `pypdf` and `python-docx` and passing the text to Gemini, we ensure zero document retention on disk, maximizing user privacy and regulatory compliance."*
3. **Structured Outputs with Modern Google GenAI SDK**:
   - *"Instead of using legacy SDKs or parsing unpredictable unstructured text, I used the modern `google-genai` SDK and enforced strict JSON output with `response_mime_type='application/json'`. This guarantees that our Flask backend receives a validated JSON schema that our React frontend can reliably render into cards, score gauges, and skill badges without crashing."*
4. **Resilience and Error Handling**:
   - *"We implemented multi-layered validation: the client validates file size and mime types before upload; the backend re-validates streams and handles corrupt or image-only PDFs gracefully; and all external AI API errors are caught and transformed into clear, actionable user messages."*
