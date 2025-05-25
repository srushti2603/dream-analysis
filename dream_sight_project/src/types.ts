export type Emotion = 'Happiness' | 'Fear' | 'Sadness' | 'Anger' | 'Peace' | 'Confusion';

export interface DreamAnalysis {
  interpretation: string;
  symbols: { symbol: string; meaning: string }[];
  reflection: string;
}

export interface DreamEntry {
  id: string;
  description: string;
  emotions: Emotion[];
  date: Date;
  isShared: boolean;
  analysis?: DreamAnalysis;
}

export interface Comment {
  id: string;
  dreamId: string;
  text: string;
  author: string;
  date: Date;
}