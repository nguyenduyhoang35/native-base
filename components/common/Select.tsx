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
  StyleSheet,
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
      style={styles.wrapper}
      ref={refView}
      onLayout={Platform.select({android: () => {}})}>
      <ButtonAnimated
        onPress={onOpen}
        outline
        style={[styles.picker, {borderColor}, style]}>
        <Text
          fs={16}
          color={selectedItem ? colors.input.text : colors.input.placeholder}>
          {selectedItem ? selectedItem.label : placeholder}
        </Text>
        <Image
          style={styles.iconDown}
          source={images.input.iconDropdown[mode]}
        />
      </ButtonAnimated>
      <Portal>
        <PressAnimated
          onPress={onClose}
          style={[
            styles.mask,
            showMask ? styles.maskDisplay : styles.maskHidden,
            {
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
            styles.bottomView,
            {backgroundColor: colors.background, paddingBottom: bottom || 10},
          ]}>
          <BottomSheet.ScrollView>
            {options.map(item => (
              <Pressable
                key={item.value}
                style={[
                  styles.option,
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

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    position: 'relative',
  },
  iconDown: {
    width: 7,
    height: 4,
  },
  error: {left: 2},
  picker: {
    overflow: 'hidden',
    borderWidth: 1,
    height: 56,
    borderRadius: 10,
    width: '100%',
    fontSize: 16,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
  },
  closeButton: {
    marginTop: 10,
    alignItems: 'center',
    padding: 15,
  },
  bottomView: {
    paddingHorizontal: 0,
    paddingBottom: 30,
  },
  select: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    height: 46,
    borderBottomWidth: 1,
    paddingHorizontal: 16,
  },
  mask: {
    position: 'absolute',
    top: 0,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  maskDisplay: {
    display: 'flex',
  },
  maskHidden: {
    display: 'none',
  },
});

export default memo(Select);
