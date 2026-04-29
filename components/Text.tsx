import {useColors} from 'providers/Theme';
import {memo, useMemo} from 'react';
import {
  DimensionValue,
  StyleSheet,
  TextProps,
  Text as TextReactNative,
  TextStyle,
} from 'react-native';

export type FontWeight = 400 | 500 | 600 | 700;

const fontFamily = {
  400: 'Poppins-Regular',
  500: 'Poppins-Medium',
  600: 'Poppins-Bold',
  700: 'Poppins-Bold',
};

export type TText<T> = {
  fw?: FontWeight;
  center?: boolean;
  fs?: number;
  primary?: boolean;
  color?: string;
  mt?: DimensionValue;
} & T;

const Text = ({
  style,
  fw = 400,
  fs,
  center,
  primary,
  color,
  mt,
  ...props
}: TText<TextProps>) => {
  const colors = useColors();

  const s = useMemo(() => {
    const st: TextStyle = {
      fontFamily: fontFamily[fw],
      color: colors.text,
    };
    if (center) st.textAlign = 'center';
    if (fs) st.fontSize = fs;
    if (primary) st.color = colors.primary;
    if (color) st.color = color;
    if (mt !== undefined) st.marginTop = mt;
    return st;
  }, [center, color, colors.primary, colors.text, fs, fw, mt, primary]);
  return <TextReactNative {...props} style={[styles.root, s, style]} />;
};

const styles = StyleSheet.create({
  root: {fontFamily: 'Poppins'},
});

export default memo(Text);
