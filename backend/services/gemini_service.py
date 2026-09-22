"""
Gemini AI Analysis Service using the official modern google-genai SDK.
Analyzes resume text (and optional job description) and produces structured JSON insights.
"""
import os
import json
import re
from google import genai
from google.genai import types


class GeminiServiceError(Exception):
    """Custom exception raised when Gemini API call or parsing fails."""
    pass


def get_gemini_client():
    """
    Initializes and returns the official Google GenAI client.
    Reads GEMINI_API_KEY from environment variables.
    """
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key or api_key.strip() == "" or api_key == "your_gemini_api_key_here":
        raise GeminiServiceError(
            "GEMINI_API_KEY is not configured. Please add your Gemini API key to backend/.env file."
        )
    return genai.Client(api_key=api_key.strip())


def clean_json_response(raw_text: str) -> dict:
    """
    Sanitizes and parses JSON string returned by the model.
    Strips markdown code blocks if present.
    """
    text = raw_text.strip()
    # Remove markdown code fences if model enclosed output in ```json ... ```
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text, flags=re.IGNORECASE)
        text = re.sub(r"\s*```$", "", text)
        text = text.strip()

    try:
        return json.loads(text)
    except json.JSONDecodeError as e:
        # Fallback regex extraction if there is leading/trailing text
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            try:
                return json.loads(match.group(0))
            except json.JSONDecodeError:
                pass
        raise GeminiServiceError(f"Failed to parse AI response as valid JSON: {str(e)}")


def analyze_resume_with_gemini(resume_text: str, job_description: str = "") -> dict:
    """
    Sends extracted resume text and optional JD to Google Gemini API
    and returns a structured analysis dictionary.
    """
    client = get_gemini_client()

    has_jd = bool(job_description and job_description.strip())
    jd_section = ""
    if has_jd:
        jd_section = f"""
TARGET JOB DESCRIPTION:
\"\"\"
{job_description.strip()}
\"\"\"
"""

    prompt = f"""
You are an expert HR Leader, Senior Technical Recruiter, and Career Coach.
Analyze the following resume thoroughly and provide an objective, actionable, and structured evaluation.

{jd_section}

RESUME CONTENT:
\"\"\"
{resume_text.strip()}
\"\"\"

INSTRUCTIONS:
1. Evaluate the resume honestly based on industry hiring standards.
2. Return ONLY a valid JSON object matching the exact JSON structure provided below.
3. Do not include markdown formatting or commentary outside the JSON.
4. Calculate an realistic overall resume score (0 to 100) considering structure, clarity, skills, experience, and impact.
5. If a Target Job Description is provided:
   - Compute a realistic job match percentage (0 to 100).
   - Identify skills present in both the resume and JD (matching_skills).
   - Identify critical skills required by the JD but missing from the resume (missing_skills).
   - Highlight relevant experiences or projects matching the JD.
   - Provide concrete, role-specific advice to boost interview chances for this JD.
6. If no Job Description is provided, set 'is_provided' to false and empty arrays/null for JD-specific items.

REQUIRED JSON FORMAT:
{{
  "overall_score": 85,
  "summary": "Concise 2-3 sentence executive professional summary of the candidate.",
  "detected_skills": {{
    "technical": ["Python", "React", "SQL"],
    "soft": ["Problem Solving", "Collaboration", "Time Management"]
  }},
  "education": [
    {{
      "degree": "Degree Title",
      "institution": "University / College Name",
      "year": "Graduation Year or Range",
      "details": "GPA / Honors / Key Coursework (if mentioned)"
    }}
  ],
  "experience": [
    {{
      "role": "Job Title",
      "company": "Company Name",
      "duration": "Start - End Date",
      "highlights": ["Achievement or responsibility 1", "Achievement 2"]
    }}
  ],
  "projects": [
    {{
      "name": "Project Name",
      "technologies": ["Tech 1", "Tech 2"],
      "description": "Short explanation of the project and impact"
    }}
  ],
  "certifications": [
    "Certification 1",
    "Certification 2"
  ],
  "strengths": [
    "Key strong point 1",
    "Key strong point 2",
    "Key strong point 3"
  ],
  "weaknesses": [
    "Specific area lacking or needing detail 1",
    "Specific area lacking or needing detail 2"
  ],
  "suggested_skills": [
    "High-demand industry skill 1",
    "High-demand industry skill 2",
    "High-demand industry skill 3"
  ],
  "improvement_suggestions": [
    "Actionable tip to make the resume more impactful 1",
    "Actionable tip 2",
    "Actionable tip 3"
  ],
  "job_match": {{
    "is_provided": { "true" if has_jd else "false" },
    "match_percentage": { 75 if has_jd else "null" },
    "matching_skills": [],
    "missing_skills": [],
    "relevant_experience": [],
    "role_specific_advice": { "\"Advice tailored to the JD\"" if has_jd else "null" }
  }}
}}
"""

    try:
        # Use gemini-2.5-flash with structured JSON response config
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.2,
            )
        )

        if not response or not response.text:
            raise GeminiServiceError("Gemini API returned an empty response. Please try again.")

        analysis_data = clean_json_response(response.text)
        return analysis_data

    except GeminiServiceError:
        raise
    except Exception as e:
        error_msg = str(e)
        # Check for common issues like invalid key or model quota
        if "API_KEY_INVALID" in error_msg or "invalid api key" in error_msg.lower():
            raise GeminiServiceError("The provided Gemini API key is invalid. Please verify your key at https://aistudio.google.com/")
        elif "RESOURCE_EXHAUSTED" in error_msg or "quota" in error_msg.lower():
            raise GeminiServiceError("Gemini API quota exceeded. Please check your usage limits or try again shortly.")
        else:
            raise GeminiServiceError(f"Gemini AI processing error: {error_msg}")
