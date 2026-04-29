import {memo, useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {IconEmail} from 'assets/svgs/input/email';
import {useColorScheme} from 'lib/useColorScheme';
import {PasswordIconHidden, PasswordIconShow} from 'assets/svgs/input/password';
import {IconUploadCircle} from 'assets/svgs/upload-circle';
import {Text} from 'components/nativewindui/Text';
import UploadImage from 'components/common/UploadImage';

const InputAnimated = Animated.createAnimatedComponent(TextInput);
const SvgXmlAnimated = Animated.createAnimatedComponent(SvgXml);

type Props<T> = {
  error?: string | boolean;
  disabled?: boolean;
  onChangeValue?: (v: string) => void;
  placeholderTextColor?: string;
  colorActive?: string;
} & T;

const Input = memo(function Input({
  style,
  placeholderTextColor,
  onFocus: _onFocus,
  onBlur: _onBlur,
  error,
  onChangeText: _onChangeText,
  onChangeValue,
  colorActive,
  ...props
}: Props<TextInputProps>) {
  const animated = useRef(new Animated.Value(0));
  const isFocus = useRef(false);
  const {colors} = useColorScheme();
  const onFocus = useCallback(
    (event: any) => {
      _onFocus?.(event);
      isFocus.current = true;
      if (!error) {
        Animated.timing(animated.current, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    [_onFocus, error],
  );

  const onBlur = useCallback(
    (event: any) => {
      _onBlur?.(event);
      isFocus.current = false;
      if (!error) {
        Animated.timing(animated.current, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    [_onBlur, error],
  );

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: error ? 2 : Number(isFocus.current),
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [error]);

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: error ? 2 : 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [error]);

  const onChangeText = useCallback(
    (v: string) => {
      _onChangeText?.(v);
      onChangeValue?.(v);
    },
    [_onChangeText, onChangeValue],
  );

  const borderColor = animated.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors.grey4, colorActive ?? colors.primary, colors.destructive],
  });

  return (
    <InputAnimated
      {...props}
      value={String(props.value ?? '')}
      style={[styles.root, {borderColor}, {color: colors.foreground}, style]}
      placeholderTextColor={placeholderTextColor || colors.grey}
      onFocus={onFocus}
      onBlur={onBlur}
      onChangeText={onChangeText}
    />
  );
});

export const InputEmail = memo(function InputEmail({
  style,
  onFocus: _onFocus,
  onBlur: _onBlur,
  error,
  disabled,
  onChangeText: _onChangeText,
  onChangeValue,
  ...props
}: Props<TextInputProps>) {
  const animated = useRef(new Animated.Value(0));
  const isFocus = useRef(false);
  const {colors} = useColorScheme();
  const onFocus = useCallback(
    (event: any) => {
      _onFocus?.(event);
      isFocus.current = true;
      if (!error) {
        Animated.timing(animated.current, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    [_onFocus, error],
  );

  const onBlur = useCallback(
    (event: any) => {
      _onBlur?.(event);
      isFocus.current = false;
      if (!error) {
        Animated.timing(animated.current, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    [_onBlur, error],
  );

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: error ? 2 : Number(isFocus.current),
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [error]);

  const onChangeText = useCallback(
    (v: string) => {
      _onChangeText?.(v);
      onChangeValue?.(v);
    },
    [_onChangeText, onChangeValue],
  );

  const borderColor = animated.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors.grey4, colors.primary, colors.destructive],
  });

  const stroke = animated.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors.primary, colors.primary, colors.destructive],
  });

  return (
    <View className="w-full">
      <InputAnimated
        {...props}
        style={[
          styles.root,
          styles.email,
          {borderColor},
          style,
          {backgroundColor: disabled ? colors.grey5 : undefined},
          {color: colors.foreground},
        ]}
        placeholderTextColor={colors.grey}
        keyboardType="email-address"
        onFocus={onFocus}
        onBlur={onBlur}
        editable={!disabled}
        onChangeText={onChangeText}
      />
      <SvgXmlAnimated
        style={styles.icon}
        stroke={disabled ? colors.grey5 : stroke}
        xml={IconEmail}
      />
    </View>
  );
});

export const InputPassword = memo(function InputPassword({
  style,
  onFocus: _onFocus,
  onBlur: _onBlur,
  error,
  onChangeText: _onChangeText,
  onChangeValue,
  ...props
}: Props<TextInputProps>) {
  const [isShow, setIsShow] = useState(false);
  const animated = useRef(new Animated.Value(0));
  const isFocus = useRef(false);
  const {colors} = useColorScheme();
  const onFocus = useCallback(
    (event: any) => {
      _onFocus?.(event);
      isFocus.current = true;
      if (!error) {
        Animated.timing(animated.current, {
          toValue: 1,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    [_onFocus, error],
  );

  const onBlur = useCallback(
    (event: any) => {
      _onBlur?.(event);
      isFocus.current = false;
      if (!error) {
        Animated.timing(animated.current, {
          toValue: 0,
          duration: 0,
          useNativeDriver: false,
        }).start();
      }
    },
    [_onBlur, error],
  );

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: error ? 2 : Number(isFocus.current),
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [error]);

  const onChangeShow = useCallback(() => {
    setIsShow(pre => !pre);
  }, []);

  const onChangeText = useCallback(
    (v: string) => {
      _onChangeText?.(v);
      onChangeValue?.(v);
    },
    [_onChangeText, onChangeValue],
  );

  const borderColor = animated.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors.grey4, colors.primary, colors.destructive],
  });

  const icon = useMemo(() => {
    const color = error ? colors.destructive : colors.primary;
    const Icon = isShow ? PasswordIconShow : PasswordIconHidden;
    const prop = isShow ? {stroke: color} : {fill: color};
    return <SvgXml {...prop} xml={Icon} />;
  }, [error, isShow, colors]);

  return (
    <View className="w-full">
      <InputAnimated
        {...props}
        style={[
          styles.root,
          styles.email,
          {borderColor},
          style,
          {color: colors.foreground},
        ]}
        placeholderTextColor={colors.grey}
        onFocus={onFocus}
        onBlur={onBlur}
        secureTextEntry={!isShow}
        onChangeText={onChangeText}
      />
      <Pressable
        className="absolute w-6 h-6 right-4 top-4"
        onPress={onChangeShow}>
        {icon}
      </Pressable>
    </View>
  );
});

type InputUploadFileProps = {
  onChangeValue?: (value: any) => any;
  value?: {uri: string; name?: string};
  placeholder?: string;
  error?: string | boolean;
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

export const InputUploadFile = memo(function InputUploadFile({
  onChangeValue,
  value,
  placeholder,
  error,
}: InputUploadFileProps) {
  const {colors} = useColorScheme();

  return (
    <UploadImage
      onChangeValue={onChangeValue}
      style={[
        INPUT_FILE_STYLE,
        {borderColor: error ? colors.destructive : colors.grey4},
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
            className="max-w-[77%] overflow-hidden"
            numberOfLines={1}
            ellipsizeMode="tail">
            {value.name}
          </Text>
        </View>
      ) : (
        <Text color="tertiary">{placeholder}</Text>
      )}
      <SvgXml fill={colors.primary} xml={IconUploadCircle} />
    </UploadImage>
  );
});

const styles = StyleSheet.create({
  root: {
    borderWidth: 1,
    height: 56,
    borderRadius: 10,
    padding: 16,
    width: '100%',
    fontSize: 16,
  },
  email: {
    paddingRight: 45,
  },
  icon: {
    position: 'absolute',
    width: 24,
    height: 24,
    right: 16,
    top: 16,
  },
});

type InputCompound = typeof Input & {
  Email: typeof InputEmail;
  Password: typeof InputPassword;
  UploadFile: typeof InputUploadFile;
};

const InputWithStatics = Input as InputCompound;
InputWithStatics.Email = InputEmail;
InputWithStatics.Password = InputPassword;
InputWithStatics.UploadFile = InputUploadFile;

export default InputWithStatics;
