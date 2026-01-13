import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import Toast from 'react-native-toast-message';
import NetInfo from "@react-native-community/netinfo";

const App = () => {
  const isFirstRender = useRef(true);
  const wasConnected = useRef<boolean | null>(null);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const isConnected = state.isConnected;

     
      if (wasConnected.current === null) {
        wasConnected.current = isConnected;
        return;
      }

      if (wasConnected.current === true && isConnected === false) {
        Toast.show({
          type: 'error',
          text1: 'Network Disconnected',
          text2: 'Please check your internet connection',
          position: 'bottom',
          visibilityTime: 4000,
        });
      } else if (wasConnected.current === false && isConnected === true) {
        Toast.show({
          type: 'success',
          text1: 'Connected',
          text2: 'Back online',
          position: 'bottom',
          visibilityTime: 3000,
        });
      }

      wasConnected.current = isConnected;
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
      <Toast />
    </SafeAreaProvider>
  );
};

export default App;
