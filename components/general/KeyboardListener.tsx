import {FC, useEffect} from 'react';
import {Keyboard, Platform, KeyboardEvent} from 'react-native';

interface IKeyboardListenerProps {
  onWillShow?: (e: KeyboardEvent) => any;
  onWillHide?: (e: KeyboardEvent) => any;
  onDidShow?: (e: KeyboardEvent) => any;
  onDidHide?: (e: KeyboardEvent) => any;
  onWillChangeFrame?: (e: KeyboardEvent) => any;
  onDidChangeFrame?: (e: KeyboardEvent) => any;
}

const KeyboardListener: FC<IKeyboardListenerProps> = ({
  onWillShow,
  onDidShow,
  onWillHide,
  onDidHide,
  onWillChangeFrame,
  onDidChangeFrame,
}) => {
  useEffect(() => {
    if (!onWillShow) {
      return;
    }
    const isAndroid = Platform.OS === 'android';
    const emit = Keyboard.addListener(
      isAndroid && !onDidShow ? 'keyboardDidShow' : 'keyboardWillShow',
      onWillShow,
    );
    return () => {
      emit.remove();
    };
  }, [onWillShow, onDidShow]);

  useEffect(() => {
    if (!onDidShow) {
      return;
    }
    const emit = Keyboard.addListener('keyboardDidShow', onDidShow);
    return () => {
      emit.remove();
    };
  }, [onDidShow]);

  useEffect(() => {
    const isAndroid = Platform.OS === 'android';
    if (!onWillHide) {
      return;
    }
    const emit = Keyboard.addListener(
      isAndroid && !onDidHide ? 'keyboardDidHide' : 'keyboardWillHide',
      onWillHide,
    );
    return () => {
      emit.remove();
    };
  }, [onWillHide, onDidHide]);

  useEffect(() => {
    if (!onDidHide) {
      return;
    }
    const emit = Keyboard.addListener('keyboardDidHide', onDidHide);
    return () => {
      emit.remove();
    };
  }, [onDidHide]);

  useEffect(() => {
    if (!onWillChangeFrame) {
      return;
    }
    const emit = Keyboard.addListener(
      'keyboardWillChangeFrame',
      onWillChangeFrame,
    );
    return () => {
      emit.remove();
    };
  }, [onWillChangeFrame]);

  useEffect(() => {
    if (!onDidChangeFrame) {
      return;
    }
    const emit = Keyboard.addListener(
      'keyboardDidChangeFrame',
      onDidChangeFrame,
    );
    return () => {
      emit.remove();
    };
  }, [onDidChangeFrame]);

  return null;
};

export default KeyboardListener;
