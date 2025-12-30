'use client';

import React, { useState } from 'react';
import { Step } from '../engines/InverseSteps';
import 'katex/dist/katex.min.css';

interface StepViewerProps {
  steps: Step[];
}

export const StepViewer: React.FC<StepViewerProps> = ({ steps }) => {
  const [showSteps, setShowSteps] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('LaTeX copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const renderLatex = (latex: string) => {
    return <span dangerouslySetInnerHTML={{ __html: renderKaTeX(latex) }} />;
  };

  const renderKaTeX = (latex: string): string => {
    if (typeof window === 'undefined') return latex;

    const katex = (window as any).katex;
    if (!katex) return latex;

    try {
      return katex.renderToString(latex, {
        throwOnError: false,
        displayMode: true,
        output: 'html'
      });
    } catch (e) {
      console.error('KaTeX render error:', e);
      return latex;
    }
  };

  return (
    <div className="mt-8">
      <button
        onClick={() => setShowSteps(!showSteps)}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
      >
        <span>{showSteps ? 'Hide' : 'Show'} Solution Steps</span>
        <svg
          className={`w-5 h-5 transition-transform ${showSteps ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showSteps && (
        <div className="mt-4 space-y-4">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
            >
              <div className="bg-purple-50 px-4 py-3 font-semibold text-gray-900 border-b border-gray-200">
                {step.title}
              </div>
              <div className="p-4">
                <p className="text-gray-600 mb-4">{step.description}</p>
                <div className="overflow-x-auto py-2 bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="text-gray-900">
                    {renderLatex(step.latex)}
                  </div>
                </div>
                <button
                  className="text-xs text-purple-600 hover:text-purple-700 mt-3 flex items-center gap-1"
                  onClick={() => copyToClipboard(step.latex)}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  Copy LaTeX
                </button>
                {step.subSteps && step.subSteps.length > 0 && (
                  <div className="mt-4 ml-4 space-y-2">
                    {step.subSteps.map((subStep, subIdx) => (
                      <div key={subIdx} className="border-l-2 border-purple-400 pl-4">
                        <div className="font-medium text-sm text-gray-700">{subStep.title}</div>
                        <p className="text-gray-600 text-sm mt-1">{subStep.description}</p>
                        <div className="overflow-x-auto py-2 bg-gray-50 rounded-lg p-2 mt-2 border border-gray-200">
                          <div className="text-gray-900">
                            {renderLatex(subStep.latex)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
