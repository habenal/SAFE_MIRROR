import { useState } from "react";

export default function UploadBox({ setResult }) {
  const [loading, setLoading] = useState(false);

  async function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:4000/api/v1/analyze", {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="p-4 border bg-white rounded shadow text-center">
      <input type="file" onChange={handleUpload} />
      {loading && <p className="mt-2 text-blue-500">Analyzing...</p>}
    </div>
  );
}
