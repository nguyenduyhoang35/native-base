import {useIsFocused} from '@react-navigation/native';
import {useEffect} from 'react';
import {Platform} from 'react-native';
import KeyboardManager from 'react-native-keyboard-manager';

export const useKeyboardManager = () => {
  const isFocused = useIsFocused();

  useEffect(() => {
    if (Platform.OS === 'android' || !isFocused) return;
    setTimeout(() => {
      KeyboardManager.setEnable(true);
      KeyboardManager.setEnableAutoToolbar(true);
    }, 100);

    return () => {
      KeyboardManager.setEnable(false);
      KeyboardManager.setEnableAutoToolbar(false);
    };
  }, [isFocused]);
  return null;
};
