import { useState } from "react";
import UploadBox from "../components/UploadBox";
import ResultCard from "../components/ResultCard";

export default function Dashboard() {
    const [result, setResult] = useState(null);
    const [consentGiven, setConsentGiven] = useState(false);
    const [showConsentModal, setShowConsentModal] = useState(false);

    // When user tries to engage with upload
    const handleUploadClick = () => {
        if (!consentGiven) {
            setShowConsentModal(true);
        }
    };

    const handleConsent = () => {
        setConsentGiven(true);
        setShowConsentModal(false);
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            {/* Hero */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                    Detect. Protect. Empower.
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    A secure, survivor-centered tool to verify the authenticity of digital media.
                    Upload suspicious files to analyze for manipulation.
                </p>
            </div>

            {/* Main Action Area */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-12">
                {result ? (
                    <ResultCard result={result} reset={() => setResult(null)} />
                ) : (
                    <div className="p-8 relative">
                        {!consentGiven && (
                            <div
                                onClick={handleUploadClick}
                                className="absolute inset-0 z-20 cursor-pointer"
                                title="Click to accept consent"
                            />
                        )}
                        <UploadBox setResult={setResult} disabled={!consentGiven} />
                    </div>
                )}
            </div>

            {/* Trust Indicators / Explainer */}
            <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Private & Secure</h3>
                    <p className="text-sm text-gray-500">Files are analyzed in an encrypted locker. You control the data.</p>
                </div>
                <div>
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">AI-Powered Detection</h3>
                    <p className="text-sm text-gray-500">Advanced analysis of deepfake artifacts and metadata anomalies.</p>
                </div>
                <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 text-purple-600">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Immediate Erasure</h3>
                    <p className="text-sm text-gray-500">Delete your reports and evidence permanently at any time.</p>
                </div>
            </div>

            {/* Consent Modal */}
            {showConsentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg max-w-md w-full p-6 shadow-xl">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Consent & Privacy</h3>
                        <div className="space-y-4 text-sm text-gray-600 mb-6">
                            <p>Before you proceed, please understand how SAFE MIRROR handles your data:</p>
                            <ul className="list-disc pl-5 space-y-2">
                                <li>Your file will be uploaded to our secure server for analysis.</li>
                                <li>We generate an encrypted evidence report.</li>
                                <li>You retain full ownership and can delete the data at any time.</li>
                                <li>We do not share this data with third parties without your explicit action.</li>
                            </ul>
                        </div>
                        <div className="flex gap-3 justify-end">
                            <button
                                onClick={() => setShowConsentModal(false)}
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleConsent}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                            >
                                I Understand & Agree
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
