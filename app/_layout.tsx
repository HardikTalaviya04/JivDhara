import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { loadMessagesFromStorage } = useChatStore();

  useEffect(() => {
    const initialize = async () => {
      try {
        await loadMessagesFromStorage();
      } catch (error) {
        console.error('Error initializing:', error);
      } finally {
        await SplashScreen.hideAsync();
      }
    };

    initialize();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
        }}
      >
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </GestureHandlerRootView>
  );
}
