import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";
import { AiResult } from '../types';
import { getApiKey } from '../config';

const MODEL_NAME = 'gemini-2.5-flash-image-preview';

function getMimeTypeFromDataUrl(dataUrl: string): string {
    return dataUrl.substring(dataUrl.indexOf(":") + 1, dataUrl.indexOf(";"));
}

export const editImageWithPrompt = async (
  base64ImageDataUrl: string,
  prompt: string
): Promise<AiResult> => {
  const apiKey = getApiKey();

  const ai = new GoogleGenAI({ apiKey });
  const mimeType = getMimeTypeFromDataUrl(base64ImageDataUrl);
  const base64Data = base64ImageDataUrl.split(',')[1];

  if (!mimeType || !base64Data) {
    throw new Error("Invalid image data URL provided.");
  }
  
  const response: GenerateContentResponse = await ai.models.generateContent({
    model: MODEL_NAME,
    contents: [ // Changed from { parts: [...] } to a direct array of parts
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
    config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
    },
  });

  let resultImageUrl: string | null = null;
  let resultText: string | null = null;
  
  const candidate = response.candidates?.[0];
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
    } else if (response.promptFeedback?.blockReason) {
        errorMessage += ` The prompt was blocked (reason: ${response.promptFeedback.blockReason}).`;
    }
    throw new Error(errorMessage);
  }

  return { imageUrl: resultImageUrl, text: resultText };
};
