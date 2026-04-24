import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp?: number;
}

interface ChatStore {
  messages: Message[];
  messageCount: number;
  selectedLanguage: 'English' | 'Hindi' | 'Gujarati';
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  setLanguage: (language: 'English' | 'Hindi' | 'Gujarati') => void;
  incrementMessageCount: () => void;
  resetMessageCount: () => void;
  loadMessagesFromStorage: () => Promise<void>;
  saveMessagesToStorage: () => Promise<void>;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  messages: [],
  messageCount: 0,
  selectedLanguage: 'English',

  addMessage: (message) => {
    set((state) => ({
      messages: [...state.messages, { ...message, timestamp: Date.now() }],
      messageCount:
        message.sender === 'user'
          ? state.messageCount + 1
          : state.messageCount,
    }));
    get().saveMessagesToStorage();
  },

  clearMessages: () => {
    set({ messages: [], messageCount: 0 });
    get().saveMessagesToStorage();
  },

  setLanguage: (language) => {
    set({ selectedLanguage: language });
  },

  incrementMessageCount: () => {
    set((state) => ({
      messageCount: state.messageCount + 1,
    }));
  },

  resetMessageCount: () => {
    set({ messageCount: 0 });
  },

  saveMessagesToStorage: async () => {
    try {
      const { messages, messageCount } = get();
      const today = new Date().toISOString().split('T')[0];
      await AsyncStorage.setItem(
        `chatMessages_${today}`,
        JSON.stringify(messages)
      );
      await AsyncStorage.setItem(
        `messageCount_${today}`,
        messageCount.toString()
      );
    } catch (error) {
      console.error('Error saving messages:', error);
    }
  },

  loadMessagesFromStorage: async () => {
    try {
      const today = new Date().toISOString().split('T')[0];
      const messages = await AsyncStorage.getItem(`chatMessages_${today}`);
      const count = await AsyncStorage.getItem(`messageCount_${today}`);

      if (messages) {
        set({ messages: JSON.parse(messages) });
      }
      if (count) {
        set({ messageCount: parseInt(count) });
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  },
}));
