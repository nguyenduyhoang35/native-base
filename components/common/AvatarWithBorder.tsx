import {useColors} from 'providers/Theme';
import {memo} from 'react';
import ImageWithAuth from './ImageWithAuth';
import {ImageBackground} from 'react-native';
import {images} from 'assets';

type TAvatar = {
  src?: string;
  size?: number;
  padding?: number;
  isSquare?: boolean;
};

const PADDING = 5;

const AvatarWithBorder = ({
  src = '',
  size = 109,
  padding = PADDING,
  isSquare,
}: TAvatar) => {
  const colors = useColors();
  const borderRadius = isSquare ? 10 : size;

  return (
    <ImageBackground
      source={isSquare ? images.borderAvatarSquare : images.borderAvatar}
      style={[
        {width: size + padding * 2, height: size + padding * 2, padding},
      ]}>
      <ImageWithAuth
        style={[
          {
            width: size,
            height: size,
            borderRadius,
            backgroundColor: src ? colors.transparent : colors.primary,
          },
        ]}
        resizeMode="cover"
        uri={src}
      />
    </ImageBackground>
  );
};

export default memo(AvatarWithBorder);
