import type {
  AnalysisRequest,
  AnalysisResult,
} from '../types';

const API_URL = 'http://localhost:8000';

export async function analyzePage(
  request: AnalysisRequest
): Promise<AnalysisResult> {
  const response = await fetch(
    `${API_URL}/analyze`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Analysis failed: ${response.status}`
    );
  }

  return response.json();
}