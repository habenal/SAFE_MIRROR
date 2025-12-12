export default function ResultCard({ result }) {
  return (
    <div className="mt-6 p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-2">Analysis Result</h2>

      <p><b>Deepfake score:</b> {result.deepfake_score}</p>
      <p><b>Nudity score:</b> {result.nudity_score}</p>

      <a
        href={`http://localhost:4000${result.report_url}`}
        target="_blank"
        className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded"
      >
        Download Evidence Report
      </a>
    </div>
  );
}
