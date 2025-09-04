import type { VercelRequest, VercelResponse } from '@vercel/node';
import { GoogleGenAI, Modality, GenerateContentResponse, Part } from "@google/genai";

const MODEL_NAME = 'gemini-2.5-flash-image-preview';

function getApiKey(): string {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.error("FATAL: API_KEY environment variable not found.");
    throw new Error(
      "The Gemini API key is missing. Please ensure it is configured in the environment settings."
    );
  }
  return apiKey;
}

function dataUrlToGeminiPart(dataUrl: string): Part {
    const match = dataUrl.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) {
        throw new Error("Invalid image data URL format.");
    }
    const mimeType = match[1];
    const base64Data = match[2];
    return {
        inlineData: {
            data: base64Data,
            mimeType: mimeType,
        },
    };
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { imageData, prompt } = request.body;

    if (!imageData || !prompt) {
      return response.status(400).json({ error: 'Missing imageData or prompt' });
    }

    const ai = new GoogleGenAI({ apiKey: getApiKey() });
    const imagePart = dataUrlToGeminiPart(imageData);

    const geminiResponse: GenerateContentResponse = await ai.models.generateContent({
        model: MODEL_NAME,
        contents: {
          parts: [
            imagePart,
            { text: prompt },
          ],
        },
        config: {
            responseModalities: [Modality.IMAGE, Modality.TEXT],
        },
    });

    let resultImageUrl: string | null = null;
    let resultText: string | null = null;
    
    const candidate = geminiResponse.candidates?.[0];
    if (candidate?.content?.parts) {
        for (const part of candidate.content.parts) {
          if (part.text) {
            resultText = part.text;
          } else if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            resultImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
          }
        }
    }
  
    if (!resultImageUrl) {
      let errorMessage = "API did not return an image. It might have refused the request.";
      if (resultText) {
          errorMessage += ` The model responded: "${resultText}"`;
      } else if (candidate?.finishReason && candidate.finishReason !== 'STOP') {
          errorMessage += ` Generation stopped unexpectedly (reason: ${candidate.finishReason}).`;
      } else if (geminiResponse.promptFeedback?.blockReason) {
          errorMessage += ` The prompt was blocked (reason: ${geminiResponse.promptFeedback.blockReason}).`;
      }
      return response.status(500).json({ error: errorMessage });
    }

    return response.status(200).json({ imageUrl: resultImageUrl, text: resultText });

  } catch (error) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'An unknown internal error occurred.';
    return response.status(500).json({ error: message });
  }
}