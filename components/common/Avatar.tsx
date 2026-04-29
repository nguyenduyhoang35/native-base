import {memo} from 'react';
import ImageWithAuth from './ImageWithAuth';
import {StyleProp} from 'react-native';
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
        {
          width: size,
          height: size,
          borderRadius,
          backgroundColor: src ? 'transparent' : colors.primary,
          margin: padding,
        },
        style,
      ]}
      resizeMode="cover"
      uri={src}
    />
  );
};

export default memo(Avatar);
