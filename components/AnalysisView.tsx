
import React from 'react';
import { AnalysisResult, RiskLevel } from '../types';
import { ShieldCheck, AlertTriangle, AlertCircle, CheckCircle2, FileWarning, HelpCircle } from 'lucide-react';

interface AnalysisViewProps {
  analysis: AnalysisResult;
}

const RiskBadge: React.FC<{ level: RiskLevel }> = ({ level }) => {
  const styles = {
    [RiskLevel.LOW]: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    [RiskLevel.MEDIUM]: 'bg-amber-50 text-amber-700 border-amber-200',
    [RiskLevel.HIGH]: 'bg-rose-50 text-rose-700 border-rose-200',
  };

  const icons = {
    [RiskLevel.LOW]: <CheckCircle2 size={14} />,
    [RiskLevel.MEDIUM]: <AlertTriangle size={14} />,
    [RiskLevel.HIGH]: <AlertCircle size={14} />,
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${styles[level]}`}>
      {icons[level]}
      {level}
    </span>
  );
};

const AnalysisView: React.FC<AnalysisViewProps> = ({ analysis }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Document Type</h3>
            <ShieldCheck className="text-blue-500" size={20} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{analysis.docType}</p>
          <p className="text-sm text-slate-500 mt-1">Detected Jurisdiction: {analysis.jurisdictionDetected}</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">Risk Assessment</h3>
            <RiskBadge level={analysis.overallRisk} />
          </div>
          <div className="flex items-end gap-2">
            <p className="text-2xl font-bold text-slate-800">{analysis.riskScore}%</p>
            <div className="flex-1 h-2 bg-slate-100 rounded-full mb-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ${analysis.overallRisk === RiskLevel.HIGH ? 'bg-rose-500' :
                    analysis.overallRisk === RiskLevel.MEDIUM ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                style={{ width: `${analysis.riskScore}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-500 text-sm font-medium">AI Confidence</h3>
            <HelpCircle className="text-slate-400" size={18} />
          </div>
          <p className="text-2xl font-bold text-slate-800">{Math.round(analysis.confidence * 100)}%</p>
          <p className="text-sm text-slate-500 mt-1">Verified by LexEdge Flow-v3-Core</p>
        </div>
      </div>

      {/* Summary Section */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            Executive Summary
          </h3>
        </div>
        <div className="p-6">
          <p className="text-slate-600 leading-relaxed italic">
            &quot;{analysis.summary}&quot;
          </p>
          <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 font-medium flex items-center gap-2">
              <ShieldCheck size={14} />
              ATTORNEY-CLIENT PRIVILEGED / WORK PRODUCT
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Automated analysis provided by LexEdge Flow AI Skills engine. For internal operations only. Not a replacement for professional legal advice.
            </p>
          </div>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-800 px-1">Applied Legal Skills</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {analysis.skillsApplied.map((skill, idx) => (
            <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
              <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                <h4 className="font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  {skill.title}
                </h4>
                <RiskBadge level={skill.riskLevel} />
              </div>
              <div className="p-6 space-y-4 flex-1">
                <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{skill.content}</p>

                {skill.clauses && skill.clauses.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Key Clauses Flagged</p>
                    <div className="space-y-2">
                      {skill.clauses.map((clause, cIdx) => (
                        <div key={cIdx} className="p-3 bg-slate-50 rounded-lg text-sm text-slate-700 border border-slate-100 font-mono text-xs">
                          {clause}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {skill.suggestions && skill.suggestions.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-blue-400 uppercase tracking-wider">Recommended Actions</p>
                    <ul className="space-y-1.5">
                      {skill.suggestions.map((suggestion, sIdx) => (
                        <li key={sIdx} className="flex items-start gap-2 text-sm text-slate-600">
                          <CheckCircle2 size={16} className="text-blue-500 mt-0.5 shrink-0" />
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalysisView;
