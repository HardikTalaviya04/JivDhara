export interface Verse {
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
  meaning: string;
}

export interface Chapter {
  id: number;
  title: string;
  sanskritTitle: string;
  description: string;
  verseCount: number;
}

export const chapters: Chapter[] = [
  { id: 1, title: "Arjuna Visada Yoga", sanskritTitle: "अर्जुनविषादयोग", description: "The Yoga of Arjuna's Dejection", verseCount: 47 },
  { id: 2, title: "Sankhya Yoga", sanskritTitle: "साङ्ख्ययोग", description: "The Yoga of Knowledge", verseCount: 72 },
  { id: 3, title: "Karma Yoga", sanskritTitle: "कर्मयोग", description: "The Yoga of Action", verseCount: 43 },
  { id: 4, title: "Jnana Karma Sanyasa Yoga", sanskritTitle: "ज्ञानकर्मसंन्यासयोग", description: "The Yoga of Knowledge and the Disciplines of Action", verseCount: 42 },
  { id: 5, title: "Karma Sanyasa Yoga", sanskritTitle: "कर्मसंन्यासयोग", description: "The Yoga of Action and Knowledge", verseCount: 29 },
  { id: 6, title: "Dhyana Yoga", sanskritTitle: "ध्यानयोग", description: "The Yoga of Self-Control", verseCount: 47 },
  { id: 7, title: "Jnana Vijnana Yoga", sanskritTitle: "ज्ञानविज्ञानयोग", description: "The Yoga of Knowledge and Judgment", verseCount: 30 },
  { id: 8, title: "Aksara Brahma Yoga", sanskritTitle: "अक्षरब्रह्मयोग", description: "The Yoga of the Imperishable Brahman", verseCount: 28 },
  { id: 9, title: "Raja Vidya Raja Guhya Yoga", sanskritTitle: "राजविद्याराजगुह्ययोग", description: "The Yoga of the Sovereign Science and Sovereign Secret", verseCount: 34 },
  { id: 10, title: "Vibhuti Yoga", sanskritTitle: "विभूतियोग", description: "The Yoga of the Divine Manifestations", verseCount: 42 },
  { id: 11, title: "Visvarupa Darsana Yoga", sanskritTitle: "विश्वरूपदर्शनयोग", description: "The Yoga of the Vision of the Cosmic Form", verseCount: 55 },
  { id: 12, title: "Bhakti Yoga", sanskritTitle: "भक्तियोग", description: "The Yoga of Devotion", verseCount: 20 },
  { id: 13, title: "Ksetra Ksetrajna Vibhaga Yoga", sanskritTitle: "क्षेत्रक्षेत्रज्ञविभागयोग", description: "The Yoga of the Field and its Knower", verseCount: 34 },
  { id: 14, title: "Gunatraya Vibhaga Yoga", sanskritTitle: "गुणत्रयविभागयोग", description: "The Yoga of the Division of the Three Gunas", verseCount: 27 },
  { id: 15, title: "Purusottama Yoga", sanskritTitle: "पुरुषोत्तमयोग", description: "The Yoga of the Supreme Person", verseCount: 20 },
  { id: 16, title: "Daivasura Sampad Vibhaga Yoga", sanskritTitle: "दैवासुरसम्पद्विभागयोग", description: "The Yoga of the Division between the Divine and the Demoniacal", verseCount: 24 },
  { id: 17, title: "Sraddhatraya Vibhaga Yoga", sanskritTitle: "श्रद्धात्रयविभागयोग", description: "The Yoga of the Threefold Faith", verseCount: 28 },
  { id: 18, title: "Moksa Sanyasa Yoga", sanskritTitle: "मोक्षसंन्यासयोग", description: "The Yoga of Liberation by Renunciation", verseCount: 78 }
];

export const verses: Verse[] = [
  {
    chapter: 2,
    verse: 47,
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥",
    translation: "You have a right to perform your prescribed duty, but you are not entitled to the fruits of action. Never consider yourself the cause of the results of your activities, and never be attached to not doing your duty.",
    meaning: "Focus on the effort, not the outcome. Doing your duty without attachment to the results brings true freedom and peace."
  },
  {
    chapter: 6,
    verse: 5,
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत्।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः॥",
    translation: "One must elevate, not degrade, oneself by one's own mind. For the mind alone is the friend of the soul, and the mind alone is the enemy of the soul.",
    meaning: "Your mind can be your greatest ally or your worst enemy. Mastering the mind is key to self-realization."
  },
  {
    chapter: 2,
    verse: 14,
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत॥",
    translation: "O son of Kunti, the nonpermanent appearance of happiness and distress, and their disappearance in due course, are like the appearance and disappearance of winter and summer seasons. They arise from sense perception, O scion of Bharata, and one must learn to tolerate them without being disturbed.",
    meaning: "Joy and sorrow are temporary and inevitable. Learn to endure them with a calm and balanced mind."
  }
];

export const getVersesByChapter = (chapterId: number): Verse[] => {
  return verses.filter(v => v.chapter === chapterId);
};

export const getRandomVerse = (): Verse => {
  const randomIndex = Math.floor(Math.random() * verses.length);
  return verses[randomIndex];
};

const aiResponses = [
  "My friend, as Krishna says in the Gita, focus on your duty and let go of the results. Your effort is what matters.",
  "Do not be swayed by temporary emotions. Just like the seasons, joy and sorrow will pass. Stay balanced.",
  "Your mind is a powerful tool. Make it your friend by focusing on positive, righteous actions.",
  "Surrender your worries to the Divine. Walk the path of Dharma (righteousness) with a pure heart.",
  "In times of confusion, remember that true wisdom lies in seeing the eternal spirit beyond the temporary body."
];

export const getAIResponse = (query: string): string => {
  // A simple simulated AI response. In a real app, this would call an LLM API.
  const lowerQuery = query.toLowerCase();

  if (lowerQuery.includes("worry") || lowerQuery.includes("anxious") || lowerQuery.includes("stress")) {
    return "When you feel anxious, remember verse 2.47: Focus only on your actions, not the fruits. Surrender the outcome to the Divine to find peace.";
  }

  if (lowerQuery.includes("sad") || lowerQuery.includes("depressed")) {
    return "Sadness is like the passing winter. Verse 2.14 reminds us that happiness and distress are temporary. Endure them with a calm mind, knowing your true self is eternal joy.";
  }

  if (lowerQuery.includes("lazy") || lowerQuery.includes("procrastinate")) {
    return "Do not become attached to inaction (Verse 2.47). Arise and do your prescribed duty, for action is better than inaction.";
  }

  // Fallback random response
  const randomIndex = Math.floor(Math.random() * aiResponses.length);
  return aiResponses[randomIndex];
};
