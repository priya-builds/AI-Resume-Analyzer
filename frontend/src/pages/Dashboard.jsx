import React from 'react';
import {
  Sparkles,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Lightbulb,
  GraduationCap,
  FolderGit2,
  Briefcase,
  Award,
  TrendingUp,
  FileCheck,
  Compass
} from 'lucide-react';
import ScoreGauge from '../components/ScoreGauge';
import SkillsBadgeGroup from '../components/SkillsBadgeGroup';
import JobMatchAnalysis from '../components/JobMatchAnalysis';
import SectionCard from '../components/SectionCard';

export default function Dashboard({ analysis, fileName, onReset }) {
  if (!analysis) return null;

  const {
    overall_score = 0,
    summary = '',
    detected_skills = {},
    education = [],
    experience = [],
    projects = [],
    certifications = [],
    strengths = [],
    weaknesses = [],
    suggested_skills = [],
    improvement_suggestions = [],
    job_match = {}
  } = analysis;

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Top Banner with Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg shadow-purple-950/20">
        <div>
          <div className="flex items-center space-x-2 text-purple-200 text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-purple-300" />
            <span>AI Diagnostic Complete</span>
            <span>•</span>
            <span className="text-white truncate max-w-xs">{fileName}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Resume Analysis Report
          </h1>
          <p className="text-sm text-purple-200/90 mt-1 max-w-2xl">
            Here is your recruiter-grade evaluation and actionable steps to elevate your profile.
          </p>
        </div>

        <button
          onClick={onReset}
          className="inline-flex items-center justify-center space-x-2 px-5 py-3 rounded-2xl bg-white text-purple-950 font-semibold hover:bg-purple-50 transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] shrink-0"
        >
          <RotateCcw className="w-4 h-4 text-purple-700" />
          <span>Upload Another Resume</span>
        </button>
      </div>

      {/* Row 1: Score Gauge & Professional Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-5">
          <ScoreGauge score={overall_score} />
        </div>

        <div className="lg:col-span-7">
          <SectionCard
            title="Professional Summary"
            subtitle="Executive overview extracted by Gemini AI"
            icon={FileCheck}
            className="h-full flex flex-col justify-between"
          >
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed italic bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
              "{summary || 'No professional summary available.'}"
            </p>
            <div className="flex items-center space-x-2 text-xs text-purple-700 pt-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Use this summary directly at the top of your resume or LinkedIn profile!</span>
            </div>
          </SectionCard>
        </div>
      </div>

      {/* Job Match Analysis (if provided or invitation banner) */}
      <JobMatchAnalysis jobMatch={job_match} />

      {/* Row 2: Skills Badges */}
      <SkillsBadgeGroup detectedSkills={detected_skills} />

      {/* Row 3: Strengths & Weaknesses side-by-side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strengths */}
        <SectionCard
          title="Key Strengths"
          subtitle="Standout attributes identified in your resume"
          icon={CheckCircle2}
          badge={`${strengths.length} Detected`}
          badgeVariant="emerald"
        >
          {strengths.length > 0 ? (
            <ul className="space-y-3">
              {strengths.map((strength, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <span className="leading-snug">{strength}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 italic">No specific strengths highlighted.</p>
          )}
        </SectionCard>

        {/* Missing / Weak Areas */}
        <SectionCard
          title="Areas for Improvement"
          subtitle="Gaps or weak spots that may cause recruiter hesitation"
          icon={AlertCircle}
          badge={`${weaknesses.length} Flags`}
          badgeVariant="amber"
        >
          {weaknesses.length > 0 ? (
            <ul className="space-y-3">
              {weaknesses.map((weakness, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                  <div className="w-5 h-5 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    !
                  </div>
                  <span className="leading-snug">{weakness}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-emerald-600 font-medium">No critical weaknesses detected!</p>
          )}
        </SectionCard>
      </div>

      {/* Row 4: Suggested Skills to Learn & Actionable Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suggested Skills to Learn */}
        <SectionCard
          title="Suggested Skills to Learn"
          subtitle="High-demand industry competencies to accelerate career growth"
          icon={TrendingUp}
          badge="High Impact"
          badgeVariant="purple"
        >
          {suggested_skills.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {suggested_skills.map((skill, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-purple-50 to-indigo-50 text-purple-900 border border-purple-200/80 shadow-2xs"
                >
                  <Compass className="w-3.5 h-3.5 text-purple-600" />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No additional skills suggested.</p>
          )}
        </SectionCard>

        {/* Resume Improvement Suggestions */}
        <SectionCard
          title="Improvement Suggestions"
          subtitle="Actionable formatting, metric, and phrasing enhancements"
          icon={Lightbulb}
          badge="Actionable"
          badgeVariant="purple"
        >
          {improvement_suggestions.length > 0 ? (
            <ul className="space-y-3">
              {improvement_suggestions.map((suggestion, idx) => (
                <li key={idx} className="flex items-start space-x-3 text-sm text-slate-700">
                  <span className="w-5 h-5 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    {idx + 1}
                  </span>
                  <span className="leading-snug">{suggestion}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-400 italic">Resume looks solid with no immediate edits needed.</p>
          )}
        </SectionCard>
      </div>

      {/* Row 5: Experience & Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience */}
        <SectionCard
          title="Work Experience"
          subtitle="Employment history and responsibilities detected"
          icon={Briefcase}
          badge={`${experience.length} Roles`}
          badgeVariant="slate"
        >
          {experience.length > 0 ? (
            <div className="space-y-4">
              {experience.map((exp, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm sm:text-base">{exp.role}</h4>
                    <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-100 mt-1 sm:mt-0 self-start">
                      {exp.duration || 'N/A'}
                    </span>
                  </div>
                  <p className="text-xs font-medium text-slate-600">{exp.company}</p>
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600 pt-1">
                      {exp.highlights.map((h, hIdx) => (
                        <li key={hIdx}>{h}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No formal work experience parsed. Fresher profile.</p>
          )}
        </SectionCard>

        {/* Projects */}
        <SectionCard
          title="Projects"
          subtitle="Academic and personal projects identified"
          icon={FolderGit2}
          badge={`${projects.length} Projects`}
          badgeVariant="slate"
        >
          {projects.length > 0 ? (
            <div className="space-y-4">
              {projects.map((proj, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <h4 className="font-bold text-slate-900 text-sm sm:text-base">{proj.name}</h4>
                  {proj.technologies && proj.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {proj.technologies.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-purple-50 text-purple-700 border border-purple-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="text-xs text-slate-600 leading-relaxed pt-1">
                    {proj.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No specific projects detected.</p>
          )}
        </SectionCard>
      </div>

      {/* Row 6: Education & Certifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Education */}
        <SectionCard
          title="Education"
          subtitle="Academic qualifications and degrees"
          icon={GraduationCap}
          badge={`${education.length} Records`}
          badgeVariant="slate"
        >
          {education.length > 0 ? (
            <div className="space-y-3">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 text-sm">{edu.degree}</h4>
                    <span className="text-xs text-slate-500 font-medium">{edu.year}</span>
                  </div>
                  <p className="text-xs font-medium text-purple-800">{edu.institution}</p>
                  {edu.details && (
                    <p className="text-xs text-slate-500 pt-1">{edu.details}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No education history found.</p>
          )}
        </SectionCard>

        {/* Certifications */}
        <SectionCard
          title="Certifications & Badges"
          subtitle="Accredited credentials and certificates"
          icon={Award}
          badge={`${certifications.length} Badges`}
          badgeVariant="slate"
        >
          {certifications.length > 0 ? (
            <div className="space-y-2">
              {certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className="flex items-center space-x-2.5 p-3 rounded-xl bg-purple-50/50 border border-purple-100 text-xs sm:text-sm font-medium text-slate-800"
                >
                  <Award className="w-4 h-4 text-purple-600 shrink-0" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-400 italic">No certifications explicitly listed.</p>
          )}
        </SectionCard>
      </div>

      {/* Bottom Reset Button */}
      <div className="text-center pt-4">
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-purple-700 text-white font-semibold hover:bg-purple-800 transition shadow-lg shadow-purple-700/20"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Upload Another Resume</span>
        </button>
      </div>
    </div>
  );
}
