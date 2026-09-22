import React from 'react';
import { Sparkles, FileText, Cpu } from 'lucide-react';

export default function Navbar({ backendStatus }) {
  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-purple-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Brand */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-brand-600 to-fuchsia-500 flex items-center justify-center shadow-md shadow-purple-500/20 text-white">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-lg text-slate-900 tracking-tight">AI Resume Analyzer</span>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                Gemini 2.5
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">Intelligent Resume Screening & Job Match Diagnostics</p>
          </div>
        </div>

        {/* Status Indicator */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
            <span className={`w-2 h-2 rounded-full ${
              backendStatus?.status === 'healthy' 
                ? 'bg-emerald-500 animate-pulse' 
                : backendStatus?.status === 'offline' 
                  ? 'bg-rose-500' 
                  : 'bg-amber-400'
            }`} />
            <span className="hidden sm:inline">Backend:</span>
            <span>{backendStatus?.status === 'healthy' ? 'Online' : backendStatus?.status === 'offline' ? 'Offline' : 'Connecting...'}</span>
          </div>

          <div className="hidden md:flex items-center text-xs text-purple-700 bg-purple-50 px-2.5 py-1.5 rounded-lg border border-purple-100">
            <Cpu className="w-3.5 h-3.5 mr-1 text-purple-600" />
            <span>Python Flask + React</span>
          </div>
        </div>
      </div>
    </header>
  );
}
