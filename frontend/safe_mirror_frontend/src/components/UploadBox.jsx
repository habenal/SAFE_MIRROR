import { useState } from "react";

export default function UploadBox({ setResult, disabled }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    if (disabled) return;
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:4000/api/v1/analyze", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className={`relative group border-2 border-dashed rounded-xl transition-colors ${disabled
        ? "border-gray-200 bg-gray-50 cursor-pointer"
        : "border-blue-200 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300"
      }`}>
      <input
        type="file"
        onChange={handleUpload}
        disabled={disabled || loading}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
      />

      <div className="p-12 text-center">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            <p className="text-blue-600 font-medium text-sm">Analyzing media safely...</p>
          </div>
        ) : (
          <>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 transition-colors ${disabled ? "bg-gray-100 text-gray-400" : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"
              }`}>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <h3 className={`text-lg font-medium mb-1 ${disabled ? "text-gray-400" : "text-gray-900"}`}>
              {disabled ? "Upload Locked" : "Click to Upload Analysis File"}
            </h3>
            <p className="text-sm text-gray-400">
              {disabled ? "Please review and accept consent first." : "Supports JPG, PNG (Max 10MB)"}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
