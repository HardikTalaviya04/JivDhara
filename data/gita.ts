export interface Verse {
  chapter: number;
  verse: number;
  sanskrit: string;
  translation: string;
  meaning: string;
}

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