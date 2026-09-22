import React, { useState, useEffect } from 'react';
import { Loader2, Sparkles, FileText, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Reading & extracting resume text', detail: 'Parsing document structure in-memory...' },
  { id: 2, label: 'Running Gemini AI evaluation', detail: 'Analyzing experience, skills, and strengths...' },
  { id: 3, label: 'Synthesizing actionable suggestions', detail: 'Preparing your personalized dashboard...' },
];

export default function LoadingState() {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(2), 1500);
    const timer2 = setTimeout(() => setCurrentStep(3), 4000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto py-12 px-6 flex flex-col items-center justify-center text-center animate-fade-in">
      {/* Animated icon orb */}
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-purple-700 via-purple-600 to-fuchsia-500 flex items-center justify-center shadow-xl shadow-purple-600/30 text-white animate-pulse">
          <Sparkles className="w-12 h-12" />
        </div>
        <div className="absolute -inset-1 rounded-3xl bg-purple-400/20 blur-lg -z-10 animate-pulse-subtle" />
      </div>

      <h3 className="text-xl font-bold text-slate-900 mb-2">
        Analyzing Your Resume with Gemini AI
      </h3>
      <p className="text-sm text-slate-500 max-w-sm mb-8">
        Please hold tight while Google Gemini thoroughly evaluates your qualifications, experience, and skills.
      </p>

      {/* Progress steps */}
      <div className="w-full max-w-md bg-white border border-purple-100 rounded-2xl p-5 shadow-sm space-y-4">
        {STEPS.map((step) => {
          const isDone = currentStep > step.id;
          const isCurrent = currentStep === step.id;

          return (
            <div
              key={step.id}
              className={`flex items-start space-x-3.5 text-left transition-opacity duration-300 ${
                isDone || isCurrent ? 'opacity-100' : 'opacity-40'
              }`}
            >
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-slate-300 flex items-center justify-center text-[10px] font-bold text-slate-400">
                    {step.id}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold ${isCurrent ? 'text-purple-900' : 'text-slate-800'}`}>
                  {step.label}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">
                  {step.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
