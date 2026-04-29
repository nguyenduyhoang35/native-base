import {Image, View} from 'react-native';
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

const INPUT_FILE_STYLE = {
  marginTop: 5,
  borderWidth: 1,
  borderStyle: 'solid' as const,
  borderRadius: 15,
  height: 56,
  alignItems: 'center' as const,
  paddingHorizontal: 16,
  flexDirection: 'row' as const,
  justifyContent: 'space-between' as const,
};

const InputUploadFile = ({onChangeValue, value, placeholder, error}: props) => {
  const colors = useColors();

  return (
    <UploadImage
      onChangeValue={onChangeValue}
      style={[
        INPUT_FILE_STYLE,
        {borderColor: error ? colors.error : colors.gray},
      ]}>
      {value ? (
        <View className="flex flex-row items-center gap-2.5">
          <Image
            source={{uri: value.uri}}
            width={43}
            height={43}
            borderRadius={5}
          />
          <Text
            style={{
              maxWidth: '77%',
              overflow: 'hidden',
              color: colors.input.text,
            }}
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

export default memo(InputUploadFile);
