import { useState } from "react";
import UploadBox from "./components/UploadBox";
import ResultCard from "./components/ResultCard";

export default function App() {
  const [result, setResult] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-6">SAFE MIRROR</h1>

      <UploadBox setResult={setResult} />

      {result && <ResultCard result={result} />}
    </div>
  );
}
