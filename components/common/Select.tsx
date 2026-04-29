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
import Button from 'components/Button';
import {useColors} from 'providers/Theme';
import Text from 'components/Text';
import Portal from 'components/general/Portal';
import BottomSheet from 'components/general/BottomSheet';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shallowEqual, useSelector} from 'react-redux';
import {modeSelector} from 'store/slices/user';
import {images} from 'assets';
import {useSpace} from 'providers/SpaceHeight';

const PressAnimated = Animated.createAnimatedComponent(Pressable);
const ButtonAnimated = Animated.createAnimatedComponent(Button);

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
  const mode = useSelector(modeSelector, shallowEqual);
  const colors = useColors();
  const {bottom} = useSafeAreaInsets();
  const bottomSheet = useRef<BottomSheet>(null);
  const [isOpen, setOpen] = useState(false);
  const refView = useRef<View>(null);

  const selectedItem = options.find(item => item.value === value);
  const animatedMask = useRef(new Animated.Value(0));
  const [showMask, setShowMask] = useState(false);
  const animated = useRef(new Animated.Value(0));
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

  useEffect(() => {
    Animated.timing(animated.current, {
      toValue: error ? 2 : Number(isOpen),
      duration: 0,
      useNativeDriver: false,
    }).start();
  }, [error, isOpen]);

  const translateYMask = animatedMask.current.interpolate({
    inputRange: [0, 0.999, 1],
    outputRange: [height, 0, 0],
  });

  const borderColor = animated.current.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [colors.gray, colors.primary, colors.error],
  });

  return (
    <View
      className="relative w-full"
      ref={refView}
      onLayout={Platform.select({android: () => {}})}>
      <ButtonAnimated
        onPress={onOpen}
        outline
        style={[PICKER_STYLE, {borderColor}, style]}>
        <Text
          fs={16}
          color={selectedItem ? colors.input.text : colors.input.placeholder}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Image
          style={{width: 7, height: 4}}
          source={images.input.iconDropdown[mode]}
        />
      </ButtonAnimated>
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
                className="p-[15px] border-b"
                style={[
                  {borderColor: colors.divider},
                  item?.value === selectedItem?.value && {
                    backgroundColor: colors.input.primary20,
                  },
                ]}
                onPress={() => onSelected?.(item.value)}>
                {item.icon}
                <Text fs={16} color={colors.input.text}>
                  {item.label}
                </Text>
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
  fontSize: 16,
  paddingHorizontal: 16,
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
