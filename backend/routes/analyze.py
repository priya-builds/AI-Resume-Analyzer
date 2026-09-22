"""
Route handlers for resume analysis API.
"""
from flask import Blueprint, request, jsonify
from utils.validators import validate_resume_file
from services.extractor import extract_resume_text, ExtractionError
from services.gemini_service import analyze_resume_with_gemini, GeminiServiceError

analyze_bp = Blueprint('analyze', __name__, url_prefix='/api')


@analyze_bp.route('/analyze-resume', methods=['POST'])
def analyze_resume():
    """
    POST /api/analyze-resume
    Expects multipart/form-data:
      - resume: File (.pdf or .docx)
      - job_description: Optional string
    """
    # 1. Check if file is provided in request
    if 'resume' not in request.files:
        return jsonify({
            'success': False,
            'error': 'No resume file provided in the request.'
        }), 400

    file = request.files['resume']

    # 2. Validate file type and size
    is_valid, error_msg, ext = validate_resume_file(file)
    if not is_valid:
        return jsonify({
            'success': False,
            'error': error_msg
        }), 400

    # 3. Read optional job description
    job_description = request.form.get('job_description', '').strip()

    # 4. Extract resume text
    try:
        resume_text = extract_resume_text(file, ext)
    except ExtractionError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 400
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f"Unexpected error during text extraction: {str(e)}"
        }), 500

    # 5. Analyze with Gemini AI
    try:
        analysis_result = analyze_resume_with_gemini(resume_text, job_description)
    except GeminiServiceError as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500
    except Exception as e:
        return jsonify({
            'success': False,
            'error': f"Unexpected server error during AI analysis: {str(e)}"
        }), 500

    # 6. Return structured response
    return jsonify({
        'success': True,
        'message': 'Resume analyzed successfully.',
        'data': analysis_result
    }), 200
