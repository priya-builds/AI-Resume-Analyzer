import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  CheckCircle,
  FileSearch,
  BrainCircuit,
  AlertCircle
} from 'lucide-react';
import Navbar from './components/Navbar';
import FileUpload from './components/FileUpload';
import JobDescriptionInput from './components/JobDescriptionInput';
import LoadingState from './components/LoadingState';
import Dashboard from './pages/Dashboard';
import { analyzeResume, checkBackendHealth } from './services/api';

export default function App() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState(null);
  const [backendStatus, setBackendStatus] = useState({ status: 'checking' });

  // Check backend health on initial load
  useEffect(() => {
    checkBackendHealth()
      .then((status) => setBackendStatus(status))
      .catch(() => setBackendStatus({ status: 'offline' }));
  }, []);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please select or drop a resume file (PDF or DOCX) to begin.');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const data = await analyzeResume(file, jobDescription);
      setAnalysis(data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'An unexpected error occurred while analyzing the resume.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setJobDescription('');
    setAnalysis(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-purple-200 selection:text-purple-900">
      <Navbar backendStatus={backendStatus} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* State 1: Loading State */}
        {isLoading && <LoadingState />}

        {/* State 2: Analysis Results Dashboard */}
        {!isLoading && analysis && (
          <Dashboard
            analysis={analysis}
            fileName={file?.name || 'Resume'}
            onReset={handleReset}
          />
        )}

        {/* State 3: Upload Landing View */}
        {!isLoading && !analysis && (
          <div className="space-y-10 animate-fade-in">
            {/* Hero Header */}
            <div className="text-center max-w-3xl mx-auto space-y-4">
              <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-purple-100/80 text-purple-800 border border-purple-200">
                <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                <span>Next-Gen AI Career Diagnostic</span>
              </div>

              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                AI Resume <span className="bg-gradient-to-r from-purple-700 via-brand-600 to-indigo-600 bg-clip-text text-transparent">Analyzer</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Elevate your resume with instant recruiter feedback powered by Google Gemini AI.
                Get structured skill tags, score metrics, actionable suggestions, and job match alignment in seconds.
              </p>
            </div>

            {/* Upload Card */}
            <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-purple-100 shadow-xl shadow-purple-950/5 space-y-6">
              <form onSubmit={handleAnalyze} className="space-y-6">
                <FileUpload
                  file={file}
                  setFile={setFile}
                  error={error}
                  setError={setError}
                />

                <JobDescriptionInput
                  jobDescription={jobDescription}
                  setJobDescription={setJobDescription}
                />

                {/* API Key Missing Warning Banner */}
                {backendStatus?.status === 'healthy' && !backendStatus?.gemini_api_key_configured && (
                  <div className="flex items-start space-x-3 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-semibold">Gemini API key not configured yet:</span> Please add your API key in <code className="bg-amber-100 px-1 py-0.5 rounded text-amber-950">backend/.env</code> (<code className="bg-amber-100 px-1 py-0.5 rounded">GEMINI_API_KEY=your_key</code>).
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={!file || isLoading}
                  className={`w-full py-4 px-6 rounded-2xl font-bold text-base flex items-center justify-center space-x-2 transition-all shadow-md ${
                    !file || isLoading
                      ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                      : 'bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white hover:opacity-95 hover:shadow-lg hover:shadow-purple-600/25 active:scale-[0.99]'
                  }`}
                >
                  <Sparkles className="w-5 h-5" />
                  <span>Analyze Resume with Gemini</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </form>
            </div>

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-purple-100/70 text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Deep Semantic Analysis</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Goes beyond keyword matching to assess structure, clarity, metrics, and hiring impact.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-purple-100/70 text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Privacy & Security First</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Zero database storage. Resumes are processed in volatile memory and never permanently stored.
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-xs p-5 rounded-2xl border border-purple-100/70 text-left space-y-2">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Target Job Matching</h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Optionally compare against specific job postings to instantly reveal missing skill gaps.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-purple-100 bg-white/60 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} AI Resume Analyzer • Built with React, Flask & Google Gemini 2.5</p>
          <div className="flex items-center space-x-4 text-purple-700 font-medium">
            <span>PDF & DOCX Parser</span>
            <span>•</span>
            <span>REST API</span>
            <span>•</span>
            <span>Structured JSON</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
