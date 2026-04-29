import React, {
  memo,
  PropsWithChildren,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  DimensionValue,
  GestureResponderEvent,
  Platform,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import Text, {FontWeight} from 'components/core/Text';
import {useColors} from 'providers/Theme';

type Props = {
  icon?: any;
  text?: string | false;
  width?: DimensionValue;
  height?: DimensionValue;
  onPress?: (event: GestureResponderEvent) => void | Promise<void>;
  outline?: boolean;
  textStyle?: StyleProp<TextStyle>;
  fw?: FontWeight;
  fs?: number;
  mt?: number;
} & Omit<TouchableOpacityProps, 'onPress'>;

const Button = ({
  children,
  text,
  width = '100%',
  style,
  onPress: _onPress,
  disabled,
  outline,
  icon,
  height = 56,
  fw = 600,
  fs = 16,
  textStyle,
  mt,
  ...p
}: PropsWithChildren<Props>) => {
  const colors = useColors();
  const loading = useRef(false);

  const child = useMemo(() => {
    if (text) {
      const color = outline ? colors.primary : colors.white;
      return (
        <Text
          numberOfLines={1}
          center
          fs={fs}
          fw={fw}
          style={[
            {color, marginTop: Platform.select({android: 2, default: 0})},
            textStyle,
          ]}>
          {text}
        </Text>
      );
    }
    return children;
  }, [
    text,
    children,
    outline,
    colors.primary,
    colors.white,
    fs,
    fw,
    textStyle,
  ]);

  const onPress = useCallback(
    async (event: GestureResponderEvent) => {
      if (loading.current || disabled) return;
      loading.current = true;
      try {
        await _onPress?.(event);
      } finally {
        loading.current = false;
      }
    },
    [_onPress, disabled, loading],
  );

  const opacity = disabled ? 0.8 : 1;

  return (
    <TouchableOpacity
      {...p}
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.root,
        disabled && styles.disabled,
        {
          backgroundColor: outline ? colors.transparent : colors.primary,
          shadowColor: outline ? colors.transparent : colors.primary,
          borderColor: colors.primary,
          height,
          marginTop: mt,
          opacity,
        },
        {width},
        style as StyleProp<ViewStyle>,
      ]}>
      {child}
      {icon ?? null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 44,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.15,
    shadowRadius: 21,
    elevation: 5,
    flexDirection: 'row',
    gap: 12,
    borderWidth: 1,
  },
  disabled: {
    opacity: 0.6,
  },
});

export default memo(Button);
