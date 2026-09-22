import React from 'react';
import { Target, CheckCircle, AlertTriangle, Briefcase, Lightbulb, Sparkles } from 'lucide-react';

export default function JobMatchAnalysis({ jobMatch }) {
  if (!jobMatch || !jobMatch.is_provided) {
    return (
      <div className="bg-gradient-to-r from-purple-50 to-fuchsia-50/50 rounded-3xl p-6 border border-purple-100 shadow-sm flex items-start space-x-4">
        <div className="p-2.5 rounded-2xl bg-purple-100 text-purple-700 shrink-0">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h4 className="text-base font-bold text-purple-950">Unlock Job-Specific Match Analysis</h4>
          <p className="text-sm text-purple-800/80 mt-1">
            Want to see how well your resume matches a specific job opening? Paste the Job Description in the optional field when uploading your resume to see match score, missing keywords, and custom tips.
          </p>
        </div>
      </div>
    );
  }

  const matchScore = jobMatch.match_percentage ?? 0;
  const matchingSkills = jobMatch.matching_skills || [];
  const missingSkills = jobMatch.missing_skills || [];
  const relevantExperience = jobMatch.relevant_experience || [];
  const advice = jobMatch.role_specific_advice;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div className="flex items-center space-x-3">
          <span className="p-2.5 rounded-2xl bg-purple-100 text-purple-700">
            <Target className="w-6 h-6" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Job Match Analysis</h3>
            <p className="text-xs text-slate-500">Tailored alignment report against your target job description</p>
          </div>
        </div>

        {/* Match Percentage Indicator */}
        <div className="flex items-center space-x-3 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-100">
          <div className="text-right">
            <span className="text-xs text-slate-500 block">Match Score</span>
            <span className="text-xl font-extrabold text-purple-900">{matchScore}%</span>
          </div>
          <div className="w-16 bg-purple-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-purple-600 h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(100, Math.max(0, matchScore))}%` }}
            />
          </div>
        </div>
      </div>

      {/* Grid: Matching vs Missing Skills */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Matching Skills */}
        <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm mb-3">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Matching Skills ({matchingSkills.length})</span>
          </div>
          {matchingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {matchingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-200"
                >
                  ✓ {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic">No direct matching skills found in resume.</p>
          )}
        </div>

        {/* Missing / Gap Skills */}
        <div className="bg-rose-50/50 rounded-2xl p-4 border border-rose-100">
          <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm mb-3">
            <AlertTriangle className="w-4 h-4 text-rose-600" />
            <span>Missing / Target Skill Gaps ({missingSkills.length})</span>
          </div>
          {missingSkills.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {missingSkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-100 text-rose-900 border border-rose-200"
                >
                  + {skill}
                </span>
              ))}
            </div>
          ) : (
            <p className="text-xs text-emerald-700 font-medium">Great job! No major skill gaps detected.</p>
          )}
        </div>
      </div>

      {/* Relevant Experience & Advice */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {relevantExperience.length > 0 && (
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex items-center space-x-2 text-slate-800 font-bold text-sm mb-2.5">
              <Briefcase className="w-4 h-4 text-purple-600" />
              <span>Relevant Experience & Projects</span>
            </div>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {relevantExperience.map((exp, idx) => (
                <li key={idx} className="flex items-start space-x-2">
                  <span className="text-purple-600 font-bold">•</span>
                  <span>{exp}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {advice && (
          <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-100">
            <div className="flex items-center space-x-2 text-purple-900 font-bold text-sm mb-2.5">
              <Lightbulb className="w-4 h-4 text-purple-600" />
              <span>Job-Specific Tailoring Tip</span>
            </div>
            <p className="text-xs text-purple-950 leading-relaxed">{advice}</p>
          </div>
        )}
      </div>
    </div>
  );
}
