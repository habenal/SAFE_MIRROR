import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function EvidenceLocker() {
    const [evidence, setEvidence] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchEvidence();
    }, []);

    async function fetchEvidence() {
        try {
            const res = await fetch("http://localhost:4000/api/v1/analyze/list");
            const data = await res.json();
            setEvidence(data);
        } catch (err) {
            console.error("Failed to fetch evidence", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleErase(id) {
        if (!window.confirm("Are you sure? This will permanently delete the report and all evidence.")) return;

        try {
            await fetch(`http://localhost:4000/api/v1/analyze/erase/${id}`, { method: "POST" });
            setEvidence(evidence.filter(e => e.id !== id));
        } catch (err) {
            alert("Failed to erase record");
        }
    }

    if (loading) return <div className="text-center py-12">Loading evidence locker...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">Evidence Locker</h2>
                    <p className="text-gray-500 mt-1">Secure repository of your analyzed media.</p>
                </div>
                <div className="text-sm text-gray-400">
                    Case Records: {evidence.length}
                </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Case ID</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Safety Status</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {evidence.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="px-6 py-12 text-center text-gray-400">
                                    No evidence records found.
                                </td>
                            </tr>
                        ) : (
                            evidence.map((item) => {
                                const isSuspicious = item.detection?.deepfake_score > 0.5 || item.detection?.nudity_score > 0.5;
                                return (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(item.createdAt).toLocaleDateString()} <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleTimeString()}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                                            {item.id}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${isSuspicious ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                                                }`}>
                                                {isSuspicious ? 'Suspicious' : 'Likely Authentic'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-4">
                                            <Link to={`/report/${item.id}`} className="text-blue-600 hover:text-blue-900">View Report</Link>
                                            <button onClick={() => handleErase(item.id)} className="text-red-600 hover:text-red-900">Erase</button>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
