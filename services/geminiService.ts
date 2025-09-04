import { AiResult } from '../types';

export const editImageWithPrompt = async (
  base64ImageDataUrl: string,
  prompt: string
): Promise<AiResult> => {

  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      imageData: base64ImageDataUrl,
      prompt: prompt,
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'An error occurred on the server.');
  }

  const result: AiResult = await response.json();
  return result;
};