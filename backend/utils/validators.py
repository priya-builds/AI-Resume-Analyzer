"""
Validation utilities for uploaded resume files.
"""
import os

ALLOWED_EXTENSIONS = {'.pdf', '.docx'}
MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024  # 5 MB


def validate_resume_file(file_storage):
    """
    Validates the uploaded file object (Werkzeug FileStorage).
    Returns (is_valid, error_message, file_extension).
    """
    if not file_storage or file_storage.filename.strip() == '':
        return False, "No file was selected for upload. Please choose a PDF or DOCX resume.", None

    filename = file_storage.filename
    _, ext = os.path.splitext(filename)
    ext = ext.lower()

    if ext not in ALLOWED_EXTENSIONS:
        return False, f"Unsupported file type '{ext}'. Only PDF (.pdf) and Word (.docx) files are supported.", None

    # Check file size by seeking to the end
    file_storage.seek(0, os.SEEK_END)
    file_size = file_storage.tell()
    file_storage.seek(0)  # Reset stream position to beginning

    if file_size == 0:
        return False, "The uploaded file is empty. Please upload a valid resume file.", None

    if file_size > MAX_FILE_SIZE_BYTES:
        max_mb = MAX_FILE_SIZE_BYTES / (1024 * 1024)
        return False, f"File size exceeds the {max_mb:.0f}MB limit. Please upload a smaller file.", None

    return True, None, ext
