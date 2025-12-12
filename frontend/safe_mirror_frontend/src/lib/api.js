export const API_URL = "http://localhost:4000";

export async function analyzeImage(formData) {
  const res = await fetch(`${API_URL}/api/v1/analyze`, {
    method: "POST",
    body: formData
  });
  return await res.json();
}
