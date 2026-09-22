/**
 * API Service for communicating with the Flask backend.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || '';

/**
 * Checks backend health and Gemini configuration.
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/health`);
    if (!response.ok) {
      throw new Error(`Server returned HTTP ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    return {
      status: 'offline',
      error: error.message || 'Cannot connect to backend server'
    };
  }
}

/**
 * Uploads resume file and optional JD to /api/analyze-resume.
 * @param {File} file - PDF or DOCX resume
 * @param {string} jobDescription - Optional target job description
 * @returns {Promise<object>} Structured analysis JSON
 */
export async function analyzeResume(file, jobDescription = '') {
  const formData = new FormData();
  formData.append('resume', file);
  if (jobDescription && jobDescription.trim()) {
    formData.append('job_description', jobDescription.trim());
  }

  const response = await fetch(`${API_BASE_URL}/api/analyze-resume`, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMessage = (data && data.error) || `Server error (status ${response.status})`;
    throw new Error(errorMessage);
  }

  if (!data || !data.success) {
    throw new Error(data?.error || 'Unknown analysis error occurred.');
  }

  return data.data;
}
