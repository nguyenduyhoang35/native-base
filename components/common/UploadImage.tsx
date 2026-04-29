import {useLanguage} from 'providers/Language';
import React, {
  memo,
  PropsWithChildren,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import {
  TouchableOpacity,
  Platform,
  StyleProp,
  ViewStyle,
  Linking,
  Alert,
  PermissionsAndroid,
  View,
  StyleSheet,
} from 'react-native';
import ImagePicker, {Image, Options} from 'react-native-image-crop-picker';
import {getFileUrl, throwError} from 'utils';
import ImageWithAuth from './ImageWithAuth';
import Text from 'components/Text';
import {useColors} from 'providers/Theme';
import {SvgXml} from 'react-native-svg';
import {IconUploadAvatar} from 'assets/svgs/profile/upload-avatar';

export type ImageData = {
  uri: string;
  type: string;
  name: string;
  size?: number;
};

type UploadImageProps = {
  onChangeValue?: (imageData: ImageData) => void;
  options?: Options;
  style?: StyleProp<ViewStyle>;
  value?: {uri?: string};
  placeholder?: string;
};

export const DEFAULT_OPTIONS_PICKER: Options = {
  width: 800,
  height: 800,
  cropping: true,
  mediaType: 'photo',
  compressImageQuality: 1,
};

export const formatImageData = (image: Image) => {
  const filename = image.path.split('/').pop() || 'photo.jpg';
  const match = /\.(\w+)$/.exec(filename);
  const type = match ? `image/${match[1]}` : image.mime || 'image/jpeg';
  const uri = getFileUrl(image.path);
  return {uri, type, name: filename, size: image.size};
};

const UploadImage = (props: PropsWithChildren<UploadImageProps>) => {
  const {
    onChangeValue,
    options = DEFAULT_OPTIONS_PICKER,
    style,
    value,
    placeholder,
  } = props;
  const refWait = useRef(false);
  const {translate} = useLanguage();
  const colors = useColors();

  const handleChooseImage = async () => {
    if (refWait.current) return;
    refWait.current = true;
    try {
      const image = await ImagePicker.openPicker(options);
      if (image) {
        const formattedImage = formatImageData(image);
        onChangeValue?.(formattedImage);
      }
    } catch (e: any) {
      if (
        ['E_NO_IMAGE_DATA_FOUND', 'E_NO_LIBRARY_PERMISSION'].includes(e.code)
      ) {
        return Alert.alert(
          translate('permission_required'),
          translate('alert_setting_permisison'),
          [
            {text: translate('cancel'), style: 'cancel'},
            {text: translate('open_settings'), onPress: Linking.openSettings},
          ],
        );
      }
      if (e.code === 'E_PICKER_CANCELLED') return;
      throwError(e);
    } finally {
      refWait.current = false;
    }
  };

  useEffect(() => {
    if (Platform.OS !== 'android') return;
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
    );
  }, []);

  const child = useMemo(() => {
    if (value?.uri) {
      return (
        <View style={styles.wrapUpload}>
          <ImageWithAuth uri={value?.uri} style={styles.previewImage} />
          <Text fs={16} fw={500} color={colors.primary}>
            {placeholder ?? translate('profile.change_upload')}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.wrapUpload}>
        <SvgXml xml={IconUploadAvatar(colors.primary)} />
        <Text fs={16} fw={500} color={colors.primary}>
          {placeholder ?? translate('profile.upload')}
        </Text>
      </View>
    );
  }, [colors.primary, translate, value?.uri, placeholder]);

  return (
    <TouchableOpacity
      style={style}
      onPress={handleChooseImage}
      activeOpacity={0.7}>
      {props.children ?? child}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapContent: {
    flex: 1,
  },
  wrapUpload: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  previewImage: {
    width: 62,
    height: 62,
    borderRadius: 999,
  },
  wrapField: {
    gap: 5,
  },
});

export default memo(UploadImage);
