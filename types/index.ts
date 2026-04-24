export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: number;
};

export type GitaVerse = {
  chapter: number;
  verse: number;
  text: string;
  transliteration: string;
  meaning: string;
};

export type Language = 'English' | 'Hindi' | 'Gujarati';

export type OnboardingSlide = {
  id: number;
  title: string;
  description: string;
  emoji: string;
  colors: string[];
};
