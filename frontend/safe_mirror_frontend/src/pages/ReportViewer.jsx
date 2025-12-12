import { useParams, Link } from "react-router-dom";

export default function ReportViewer() {
    const { id } = useParams();
    const pdfUrl = `http://localhost:4000/api/v1/analyze/report/${id}`;

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-white">Evidence Report</h2>
                        <p className="text-xs text-slate-400 font-mono">ID: {id}</p>
                    </div>
                </div>
                <Link
                    to="/"
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                    &larr; Back to Dashboard
                </Link>
            </div>

            <div className="glass-panel p-1 rounded-xl h-[80vh] bg-slate-900/50">
                <iframe
                    src={pdfUrl}
                    className="w-full h-full rounded-lg bg-slate-100" // PDF needs white bg usually
                    title="Evidence Report PDF"
                />
            </div>
        </div>
    );
}
