import {memo} from 'react';
import ImageWithAuth from './ImageWithAuth';
import {StyleProp, StyleSheet} from 'react-native';
import {ImageStyle} from 'react-native-fast-image';
import {useColorScheme} from 'lib/useColorScheme';

type TAvatar = {
  src?: string;
  size?: number;
  style?: StyleProp<ImageStyle>;
  isSquare?: boolean;
  padding?: number;
};

const Avatar = ({
  src = '',
  size = 109,
  style,
  isSquare,
  padding = 0,
}: TAvatar) => {
  const borderRadius = isSquare ? 10 : size;
  const {colors} = useColorScheme();

  return (
    <ImageWithAuth
      style={[
        src ? styles.transparent : {backgroundColor: colors.primary},
        {width: size, height: size, borderRadius, margin: padding},
        style,
      ]}
      resizeMode="cover"
      uri={src}
    />
  );
};

const styles = StyleSheet.create({
  transparent: {
    backgroundColor: 'transparent',
  },
});

export default memo(Avatar);
