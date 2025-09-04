
export enum AppState {
  INITIAL,
  CAPTURING,
  IMAGE_SELECTED,
  GENERATING,
  RESULT,
  ERROR,
}

export interface Template {
  id: string;
  name: string;
  prompt: string;
  icon: JSX.Element;
}

export interface AiResult {
  imageUrl: string | null;
  text: string | null;
}
