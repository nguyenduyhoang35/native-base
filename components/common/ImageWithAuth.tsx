import {memo} from 'react';
import FastImage, {FastImageProps} from 'react-native-fast-image';
import {getFileUrl} from 'utils';

type Props<T> = {
  uri: string;
} & Omit<T, 'source'>;

const ImageWithAuth = ({uri, ...props}: Props<FastImageProps>) => {
  return (
    <FastImage {...props} source={uri ? {uri: getFileUrl(uri)} : undefined} />
  );
};

export default memo(ImageWithAuth);
