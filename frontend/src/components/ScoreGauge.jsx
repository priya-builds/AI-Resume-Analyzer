import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Award, Zap, TrendingUp } from 'lucide-react';

export default function ScoreGauge({ score = 0 }) {
  const clampedScore = Math.max(0, Math.min(100, Math.round(score)));

  // Trigger celebratory confetti for high scores
  useEffect(() => {
    if (clampedScore >= 80) {
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#9333ea', '#a855f7', '#c084fc', '#f472b6', '#3b82f6']
        });
      } catch (e) {
        // silent fallback
      }
    }
  }, [clampedScore]);

  // Determine badge and color accents based on score
  let ratingText = 'Needs Work';
  let badgeBg = 'bg-amber-100 text-amber-800 border-amber-200';
  let ringColor = 'text-amber-500';

  if (clampedScore >= 90) {
    ratingText = 'Exceptional';
    badgeBg = 'bg-purple-100 text-purple-800 border-purple-200';
    ringColor = 'text-purple-600';
  } else if (clampedScore >= 80) {
    ratingText = 'Strong Match';
    badgeBg = 'bg-emerald-100 text-emerald-800 border-emerald-200';
    ringColor = 'text-emerald-500';
  } else if (clampedScore >= 65) {
    ratingText = 'Good Foundation';
    badgeBg = 'bg-blue-100 text-blue-800 border-blue-200';
    ringColor = 'text-blue-500';
  }

  // SVG Circular Gauge calculation
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clampedScore / 100) * circumference;

  return (
    <div className="bg-white rounded-3xl p-6 border border-purple-100 shadow-sm flex flex-col items-center sm:flex-row sm:items-center justify-between gap-6">
      <div className="flex flex-col items-center sm:items-start text-center sm:text-left space-y-2">
        <div className="flex items-center space-x-2">
          <span className="p-2 rounded-xl bg-purple-100 text-purple-700">
            <Award className="w-5 h-5" />
          </span>
          <h2 className="text-xl font-bold text-slate-900">Overall Resume Score</h2>
        </div>
        <p className="text-sm text-slate-500 max-w-sm">
          Calculated based on industry recruiter benchmarks, keyword depth, experience impact, and structural clarity.
        </p>
        <div className="flex items-center space-x-2 pt-1">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${badgeBg}`}>
            <TrendingUp className="w-3.5 h-3.5 mr-1" />
            {ratingText}
          </span>
          <span className="text-xs text-slate-400">Score Scale: 0 - 100</span>
        </div>
      </div>

      {/* Circular Progress Gauge */}
      <div className="relative flex items-center justify-center shrink-0">
        <svg className="w-36 h-36 transform -rotate-90">
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            className="text-slate-100"
            fill="transparent"
          />
          <circle
            cx="72"
            cy="72"
            r={radius}
            stroke="currentColor"
            strokeWidth="10"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className={`${ringColor} transition-all duration-1000 ease-out`}
            fill="transparent"
          />
        </svg>

        <div className="absolute flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {clampedScore}
          </span>
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            out of 100
          </span>
        </div>
      </div>
    </div>
  );
}
