import { useState } from "react";
import { Link } from "react-router-dom";

export default function ResultCard({ result, reset }) {
  const [safeView, setSafeView] = useState(true);

  const isFake = result.deepfake_score > 0.5;
  const isNsfw = result.nudity_score > 0.5;

  const statusColor = isFake ? "bg-red-50 text-red-700 border-red-100" : "bg-green-50 text-green-700 border-green-100";

  return (
    <div className="p-6 md:p-8 animate-fade-in">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Visual Evidence Area - Safe View */}
        <div className="w-full md:w-1/3">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden border border-gray-200 flex items-center justify-center">
            {/* Placeholder for the actual image which would be here. Using an icon for now or simple text */}
            <div className={`absolute inset-0 flex items-center justify-center bg-gray-200 transition-all duration-500 ${safeView ? 'blur-xl opacity-80' : 'blur-0 opacity-100'}`}>
              <span className="text-4xl">🖼️</span>
            </div>

            {safeView && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-white/30 backdrop-blur-sm p-4 text-center">
                <div className="w-8 h-8 bg-gray-800 text-white rounded-full flex items-center justify-center mb-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                </div>
                <p className="text-sm font-semibold text-gray-900">Safe View Mode</p>
                <p className="text-xs text-gray-600 mb-3">Content hidden for your safety.</p>
                <button
                  onClick={() => setSafeView(false)}
                  className="px-3 py-1 bg-white border border-gray-300 rounded text-xs font-medium hover:bg-gray-50"
                >
                  Reveal Content
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Analysis Data */}
        <div className="flex-1 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-2">Analysis Results</h2>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${statusColor}`}>
              {isFake ? "High Probability of Manipulation" : "Likely Authentic Content"}
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Deepfake Probability</span>
                <span className="font-semibold text-gray-900">{(result.deepfake_score * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${isFake ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${result.deepfake_score * 100}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-gray-600">Nudity Risk</span>
                <span className="font-semibold text-gray-900">{(result.nudity_score * 100).toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${isNsfw ? 'bg-orange-500' : 'bg-green-500'}`} style={{ width: `${result.nudity_score * 100}%` }}></div>
              </div>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap gap-3">
            <Link
              to={`/report/${result.id}`}
              className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 text-center"
            >
              View Full Report
            </Link>
            <button
              onClick={reset}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Analyze Another
            </button>
            {/* Erase handled inside Evidence Locker predominantly, but could be here too */}
          </div>

          <div className="text-xs text-gray-400 pt-2 border-t border-gray-100">
            Evidence ID: <span className="font-mono">{result.id}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
