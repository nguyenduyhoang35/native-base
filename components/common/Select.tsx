import React, {
  JSX,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  View,
  Animated,
  Pressable,
  useWindowDimensions,
  Keyboard,
  Dimensions,
  Image,
  Platform,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {Text} from 'components/nativewindui/Text';
import {useColorScheme} from 'lib/useColorScheme';
import Portal from 'components/general/Portal';
import BottomSheet from 'components/general/BottomSheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {images} from 'assets';
import {useSpace} from 'providers/SpaceHeight';

const PressAnimated = Animated.createAnimatedComponent(Pressable);

type Props = {
  options: {label: string; value: string; icon?: JSX.Element}[];
  value?: string;
  onChangeValue?: (value: string) => void;
  placeholder?: string;
  error?: string;
  style?: StyleProp<ViewStyle>;
};

const Select = ({
  options,
  value,
  onChangeValue,
  placeholder,
  error,
  style,
}: Props) => {
  const {colors, colorScheme} = useColorScheme();
  const {bottom} = useSafeAreaInsets();
  const bottomSheet = useRef<BottomSheet>(null);
  const [isOpen, setOpen] = useState(false);
  const refView = useRef<View>(null);

  const selectedItem = options.find(item => item.value === value);
  const animatedMask = useRef(new Animated.Value(0));
  const [showMask, setShowMask] = useState(false);
  const {height} = useWindowDimensions();
  const onShow = useSpace();

  const onOpen = useCallback(() => {
    setOpen(true);
    setShowMask(true);
  }, []);

  const onClose = useCallback(() => {
    setOpen(false);
    bottomSheet.current?.snapToIndex(0);
  }, []);

  const getLayout = useCallback(() => {
    const _height = bottomSheet.current?.getContentLayout()?.height ?? 0;
    refView.current?.measure((...args) => {
      const top = args[1] >= args[5] ? args[1] : args[5];
      const space = Dimensions.get('screen').height - (top + args[3]);
      const tr = _height - space + 10;
      if (tr > 0) onShow(-tr);
    });
  }, [onShow]);

  const onOpenBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    bottomSheet.current?.snapToIndex(1);
    getLayout();
    Animated.timing(animatedMask.current, {
      toValue: 1,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [getLayout]);

  const closeBottomSheet = useCallback(() => {
    setShowMask(false);
    Animated.timing(animatedMask.current, {
      toValue: 0,
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, []);

  const onSelected = useCallback(
    (_value: string) => {
      onChangeValue?.(_value);
      onClose();
    },
    [onChangeValue, onClose],
  );

  useEffect(() => {
    if (isOpen) onOpenBottomSheet();
    else onShow(0);
    return () => {
      onShow(0);
    };
  }, [isOpen, onOpenBottomSheet, onShow]);

  const translateYMask = animatedMask.current.interpolate({
    inputRange: [0, 0.999, 1],
    outputRange: [height, 0, 0],
  });

  const borderColor = error
    ? colors.destructive
    : isOpen
      ? colors.primary
      : colors.grey4;

  return (
    <View
      className="relative w-full"
      ref={refView}
      onLayout={Platform.select({android: () => {}})}>
      <Pressable
        onPress={onOpen}
        style={[PICKER_STYLE, {borderColor}, style]}>
        <Text
          variant="callout"
          color={selectedItem ? 'primary' : 'tertiary'}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Image
          style={{width: 7, height: 4}}
          source={images.input.iconDropdown[colorScheme]}
        />
      </Pressable>
      <Portal>
        <PressAnimated
          onPress={onClose}
          style={[
            MASK_STYLE,
            {
              display: showMask ? 'flex' : 'none',
              opacity: animatedMask.current,
              transform: [{translateY: translateYMask}],
            },
          ]}
        />
        <BottomSheet
          onClosed={closeBottomSheet}
          onOpened={getLayout}
          draggable={false}
          ref={bottomSheet}
          style={[
            BOTTOM_VIEW_STYLE,
            {backgroundColor: colors.background, paddingBottom: bottom || 10},
          ]}>
          <BottomSheet.ScrollView>
            {options.map(item => (
              <Pressable
                key={item.value}
                className="p-[15px] border-b border-border"
                style={
                  item?.value === selectedItem?.value
                    ? {backgroundColor: colors.grey6}
                    : undefined
                }
                onPress={() => onSelected?.(item.value)}>
                {item.icon}
                <Text variant="callout">{item.label}</Text>
              </Pressable>
            ))}
          </BottomSheet.ScrollView>
        </BottomSheet>
      </Portal>
    </View>
  );
};

const PICKER_STYLE = {
  overflow: 'hidden' as const,
  borderWidth: 1,
  height: 56,
  borderRadius: 10,
  width: '100%' as const,
  paddingHorizontal: 16,
  flexDirection: 'row' as const,
  alignItems: 'center' as const,
  justifyContent: 'space-between' as const,
};

const BOTTOM_VIEW_STYLE = {
  paddingHorizontal: 0,
  paddingBottom: 30,
};

const MASK_STYLE = {
  position: 'absolute' as const,
  top: 0,
  flex: 1,
  width: '100%' as const,
  height: '100%' as const,
};

export default memo(Select);
