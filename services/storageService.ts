import AsyncStorage from '@react-native-async-storage/async-storage';
import { useChatStore } from '../store/chatStore';

export const initializeStorage = async () => {
  try {
    // Load messages from storage on app startup
    await useChatStore.getState().loadMessagesFromStorage();
  } catch (error) {
    console.error('Error initializing storage:', error);
  }
};

export const saveUserPreference = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(`user_pref_${key}`, value);
  } catch (error) {
    console.error('Error saving preference:', error);
  }
};

export const getUserPreference = async (key: string): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(`user_pref_${key}`);
  } catch (error) {
    console.error('Error getting preference:', error);
    return null;
  }
};
