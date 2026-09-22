import React from 'react';
import { Code, Users, Check } from 'lucide-react';

export default function SkillsBadgeGroup({ detectedSkills }) {
  const technical = detectedSkills?.technical || [];
  const soft = detectedSkills?.soft || [];

  return (
    <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-6">
      <div className="flex items-center space-x-2 border-b border-slate-100 pb-4">
        <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
          <Code className="w-5 h-5" />
        </span>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Detected Skills</h3>
          <p className="text-xs text-slate-500">Extracted and categorized automatically by Gemini AI</p>
        </div>
      </div>

      {/* Technical Skills */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
            Technical & Domain Skills ({technical.length})
          </span>
        </div>
        {technical.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {technical.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-purple-50 text-purple-800 border border-purple-200/80 shadow-2xs hover:bg-purple-100/70 transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-purple-600 mr-2" />
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No specific technical skills detected.</p>
        )}
      </div>

      {/* Soft Skills */}
      <div>
        <div className="flex items-center space-x-2 mb-3">
          <Users className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">
            Interpersonal & Soft Skills ({soft.length})
          </span>
        </div>
        {soft.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {soft.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium bg-slate-50 text-slate-700 border border-slate-200 shadow-2xs hover:bg-slate-100 transition-colors"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-400 italic">No soft skills explicitly listed.</p>
        )}
      </div>
    </div>
  );
}
