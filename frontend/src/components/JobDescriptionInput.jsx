import React from 'react';
import { Target, Sparkles, X } from 'lucide-react';

export default function JobDescriptionInput({ jobDescription, setJobDescription }) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <label className="flex items-center space-x-1.5 text-sm font-semibold text-slate-800">
          <Target className="w-4 h-4 text-purple-600" />
          <span>Target Job Description</span>
          <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
            Optional
          </span>
        </label>
        {jobDescription && (
          <button
            type="button"
            onClick={() => setJobDescription('')}
            className="text-xs text-slate-400 hover:text-slate-600 flex items-center space-x-0.5 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      <div className="relative">
        <textarea
          rows={4}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description or requirements here to enable Job Match Scoring, Missing Skills Detection, and tailored career advice..."
          className="w-full text-sm rounded-xl border border-slate-300 focus:border-purple-600 focus:ring-2 focus:ring-purple-600/20 p-3.5 text-slate-800 placeholder-slate-400 bg-white transition resize-y min-h-[105px]"
        />
        {jobDescription.trim() && (
          <div className="absolute bottom-3 right-3 pointer-events-none flex items-center space-x-1 text-xs text-purple-700 bg-purple-50/90 border border-purple-200 px-2 py-0.5 rounded-md backdrop-blur-xs">
            <Sparkles className="w-3 h-3 text-purple-600" />
            <span>Job Matching Active</span>
          </div>
        )}
      </div>
      <p className="text-xs text-slate-500 mt-1.5 flex items-center space-x-1">
        <span>💡 Adding a Job Description enables Gemini to calculate a personalized role match percentage and missing skill gaps.</span>
      </p>
    </div>
  );
}
