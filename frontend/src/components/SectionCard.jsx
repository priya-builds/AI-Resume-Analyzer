import React from 'react';

export default function SectionCard({
  title,
  subtitle,
  icon: Icon,
  badge,
  badgeVariant = 'purple',
  children,
  className = '',
}) {
  const badgeStyles = {
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
    emerald: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    amber: 'bg-amber-100 text-amber-800 border-amber-200',
    slate: 'bg-slate-100 text-slate-700 border-slate-200',
  };

  return (
    <div className={`bg-white rounded-3xl p-6 border border-purple-100 shadow-sm space-y-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="p-2 rounded-xl bg-purple-100 text-purple-700 shrink-0">
              <Icon className="w-5 h-5" />
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-slate-900">{title}</h3>
            {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
          </div>
        </div>

        {badge !== undefined && (
          <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badgeStyles[badgeVariant] || badgeStyles.purple}`}>
            {badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div>{children}</div>
    </div>
  );
}
