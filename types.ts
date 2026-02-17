
export interface PartyAsset {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  type: 'invitation' | 'tag' | 'panel' | 'topper' | 'sticker' | 'favor';
}

export interface GenerationState {
  isGenerating: boolean;
  progress: number;
  status: string;
  error: string | null;
}

export interface UserInput {
  photo: string | null;
  theme: string;
}
