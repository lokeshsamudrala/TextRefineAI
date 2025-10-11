export type ParaphrasingStyle = 'general' | 'professional' | 'friendly' | 'creative';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function paraphraseText(text: string, style: ParaphrasingStyle): Promise<string> {
  if (!text.trim()) return '';

  try {
    const response = await fetch(`${API_BASE_URL}/api/rephrase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, style }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.rephrased_text;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'Failed to process text');
  }
}