import { useEffect, useRef } from 'react';
import { AppState, AppStateStatus } from 'react-native';
import { useChatStore } from '../store/chatStore';

export const useAppLifecycle = () => {
  const appState = useRef(AppState.currentState);
  const { resetMessageCount } = useChatStore();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    return () => {
      subscription.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: AppStateStatus) => {
    // Reset daily message count at midnight
    const today = new Date().toISOString().split('T')[0];
    const lastResetDay = appState.current;

    if (today !== lastResetDay) {
      resetMessageCount();
    }

    appState.current = nextAppState;
  };
};
