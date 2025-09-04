
import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { AiResult } from '../types';

const MODEL_NAME = 'gemini-2.5-flash-image-preview';

function getMimeTypeFromDataUrl(dataUrl: string): string {
    return dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));
}

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

export const editImageWithPrompt = async (
  base64ImageDataUrl: string,
  prompt: string
): Promise<AiResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const mimeType = getMimeTypeFromDataUrl(base64ImageDataUrl);
  const base64Data = base64ImageDataUrl.split(',')[1];

  if (!mimeType || !base64Data) {
    throw new Error("Invalid image data URL provided.");
  }
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: {
      parts: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        {
          text: prompt,
        },
      ],
    },
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  let resultImageUrl: string | null = null;
  let resultText: string | null = null;
  
  if (response.candidates && response.candidates[0] && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          resultText = part.text;
        } else if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          resultImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
        }
      }
  }

  if (!resultImageUrl) {
    throw new Error("API did not return an image. It might have refused the request.");
  }

  return { imageUrl: resultImageUrl, text: resultText };
};
