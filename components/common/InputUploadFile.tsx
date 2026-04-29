import {Image, StyleSheet, View} from 'react-native';
import {memo} from 'react';
import {useColors} from 'providers/Theme';
import {SvgXml} from 'react-native-svg';
import {IconUploadCircle} from 'assets/svgs/upload-circle';
import Text from 'components/Text';
import UploadImage from './UploadImage';

type props = {
  onChangeValue?: (value: any) => any;
  value?: any;
  placeholder?: string;
  error?: any;
};

const InputUploadFile = ({onChangeValue, value, placeholder, error}: props) => {
  const colors = useColors();

  return (
    <UploadImage
      onChangeValue={onChangeValue}
      style={[
        styles.inputFile,
        styles.input,
        {borderColor: error ? colors.error : colors.gray},
      ]}>
      {value ? (
        <View style={styles.imageWrap}>
          <Image
            source={{uri: value.uri}}
            width={43}
            height={43}
            borderRadius={5}
          />
          <Text
            style={[styles.textImage, {color: colors.input.text}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {value.name}
          </Text>
        </View>
      ) : (
        <Text color={colors.input.placeholder}>{placeholder}</Text>
      )}
      <SvgXml fill={colors.primary} xml={IconUploadCircle} />
    </UploadImage>
  );
};

const styles = StyleSheet.create({
  input: {marginTop: 5},
  keyword: {marginTop: 16},
  inputFile: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 15,
    height: 56,
    alignItems: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textImage: {
    maxWidth: '77%',
    overflow: 'hidden',
  },
});

export default memo(InputUploadFile);
