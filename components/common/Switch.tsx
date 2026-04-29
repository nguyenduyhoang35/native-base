import {useColors} from 'providers/Theme';
import type React from 'react';
import {useState, useEffect} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
  type ViewStyle,
} from 'react-native';

interface CustomSwitchProps {
  value?: boolean;
  onChangeValue?: (value: boolean) => void;
  disabled?: boolean;
  width?: number;
  height?: number;
  thumbSize?: number;
  thumbColor?: string;
  trackColorOff?: string;
  trackColorOn?: string;
  style?: ViewStyle;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  value = false,
  onChangeValue,
  disabled = false,
  width = 56,
  height = 29,
  thumbSize = 22,
  style,
}) => {
  const colors = useColors();
  const [switchValue, setSwitchValue] = useState(value);
  const [thumbPosition] = useState(new Animated.Value(value ? 1 : 0));

  useEffect(() => {
    setSwitchValue(value);
    Animated.timing(thumbPosition, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [value, thumbPosition]);

  const handleToggle = () => {
    if (disabled) return;

    const newValue = !switchValue;
    setSwitchValue(newValue);

    Animated.timing(thumbPosition, {
      toValue: newValue ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    if (onChangeValue) {
      onChangeValue(newValue);
    }
  };

  const translateX = thumbPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [0, width - thumbSize - 4],
  });

  const borderRadius = height / 2;

  return (
    <TouchableWithoutFeedback onPress={handleToggle} disabled={disabled}>
      <View
        style={[
          styles.container,
          disabled ? styles.disable : null,
          {
            width,
            height,
            borderRadius,
            backgroundColor: switchValue
              ? colors.primary
              : colors.input.codeInput,
          },
          style,
        ]}>
        <Animated.View
          style={[
            styles.thumb,
            {
              width: thumbSize,
              height: thumbSize,
              borderRadius: thumbSize / 2,
              backgroundColor: colors.white,
              transform: [{translateX}],
            },
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 2,
  },
  thumb: {
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  disable: {
    opacity: 0.5,
  },
});

export default CustomSwitch;
