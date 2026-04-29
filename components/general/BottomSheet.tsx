import React, {
  Component,
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import {
  Animated,
  FlatList,
  FlatListProps,
  GestureResponderEvent,
  LayoutChangeEvent,
  LayoutRectangle,
  NativeScrollEvent,
  NativeSyntheticEvent,
  PanResponder,
  PanResponderGestureState,
  PanResponderInstance,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

type Props = {
  height?: number[];
  style?: StyleProp<ViewStyle>;
  initIndex?: number;
  onAnimatedChange?: (value: number) => void;
  customDrag?: () => ReactNode;
  onClosed?: () => void;
  onOpened?: () => void;
  draggable?: boolean;
  draggableContent?: boolean;
};

type State = {
  isReady: boolean;
  scrollEnabled: boolean;
  hasChildScroll: boolean;
};

type AnimatedWithValue = Animated.Value & {_value: number};

class BottomSheet extends Component<PropsWithChildren<Props>, State> {
  static ScrollView: typeof BottomSheetScrollView;
  private _layout?: LayoutRectangle;
  private panRes: PanResponderInstance;
  private animated: AnimatedWithValue;
  private previousAnimatedValue?: number;
  private isGestureUp?: boolean;
  static FlatList: <T>(
    props: PropsWithChildren<FlatListProps<T>>,
  ) => React.JSX.Element;
  isClosed: boolean;

  constructor(props: PropsWithChildren<Props>) {
    super(props);
    const {height = [0]} = props;
    const initValue = Math.max(...height);
    this.animated = new Animated.Value(initValue) as AnimatedWithValue;
    this.panRes = PanResponder.create({
      onMoveShouldSetPanResponder: this.onMoveShould,
      onPanResponderMove: this.onPanResponderMove,
      onPanResponderRelease: this.onPanResponderRelease,
    });
    this.state = {isReady: false, scrollEnabled: false, hasChildScroll: false};
    this.animated.addListener(this.onAnimatedChange);
    this.previousAnimatedValue = undefined;
    this.isClosed = false;
  }

  componentDidMount(): void {
    const {initIndex} = this.props;
    if (initIndex !== undefined) {
      this.snapToIndex(initIndex);
    }
  }

  componentWillUnmount(): void {
    this.animated.removeAllListeners();
  }

  private onLayout = ({nativeEvent}: LayoutChangeEvent) => {
    this._layout = nativeEvent.layout;
    if (!this.animated._value) {
      this.animated.setValue(this._layout.height + this._layout.y);
    }
    this.setState({isReady: true});
  };

  private isReady = async (): Promise<boolean> => {
    const {isReady} = this.state;
    if (!isReady) {
      await new Promise<void>(res => setTimeout(() => res(), 10));
      return await this.isReady();
    }
    return true;
  };

  private onAnimatedChange = ({value}: {value: number}) => {
    const {onAnimatedChange} = this.props;
    if (onAnimatedChange) {
      const {height: _height, y} = this._layout || {height: 0, y: 0};
      const {height = [_height + y]} = this.props;
      const toValue = 1 - value / Math.max(...height);
      onAnimatedChange(toValue);
    }
  };

  getContentLayout = () => this._layout;

  open = (animation: boolean = true) => {
    this.snapToIndex(1, animation);
  };

  close = (animation: boolean = true) => {
    this.snapToIndex(0, animation);
  };

  snapToIndex = async (index: number, animation: boolean = true) => {
    await this.isReady();
    const {
      height = [this._layout?.height || 0],
      onClosed,
      onOpened,
    } = this.props;
    const max = Math.max(...height) || 0;
    let toValue = max - height?.[index] || 0;
    if (!index && !this.props.height?.length) {
      toValue = height[0];
    }
    const animated = animation ? springAnimated : timingAnimated;
    await new Promise(res => {
      animated(this.animated, toValue).start();
      setTimeout(
        () => {
          this.setState({scrollEnabled: index + 1 >= (height?.length ?? 0)});
          res(undefined);
        },
        animation ? 300 : 1,
      );
    });
    if (!index) {
      if (!this.isClosed) {
        onClosed?.();
        this.isClosed = true;
      }
    } else {
      this.isClosed = false;
      onOpened?.();
    }
  };

  // ------ Control Pan ------ //
  private onMoveShould = () => true;

  private onPanResponderMove = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    const {draggable = true} = this.props;
    if (!draggable) return;
    if (!this.previousAnimatedValue) {
      this.previousAnimatedValue = this.animated._value;
    }
    let toValue = this.previousAnimatedValue + gestureState.dy;
    this.isGestureUp = toValue < this.animated._value;
    if (toValue < 0) {
      toValue = 0;
    }
    timingAnimated(this.animated, toValue).start();
  };

  private onPanResponderRelease = (
    _: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (this.previousAnimatedValue === undefined) {
      return;
    }
    let toValue = this.previousAnimatedValue + gestureState.dy;
    if (toValue < 0) {
      toValue = 0;
    }
    this.snapToIndex(this.getToValue(toValue));
    this.previousAnimatedValue = undefined;
  };

  private getToValue = (toValue: number) => {
    const {height = [this._layout?.height || 0]} = this.props;
    const check = Math.max(...height) - toValue;
    let index = height.findIndex(
      (e, i) => e < check && (height[i + 1] || check) >= check,
    );
    if (index === -1) {
      index = 0;
    }
    return this.isGestureUp ? index + 1 : index;
  };

  private controlScroll = (scrollEnabled: boolean) => {
    const {draggable} = this.props;
    if (!draggable) return;
    this.setState({scrollEnabled});
  };
  // ------ Control Pan ------ //

  private setChildScroll = (has: boolean) => {
    this.setState({hasChildScroll: has});
  };

  render() {
    const {
      children,
      style,
      height = [],
      customDrag,
      draggable = true,
      draggableContent = true,
    } = this.props;
    const {isReady, scrollEnabled, hasChildScroll} = this.state;

    return (
      <BottomSheetContext.Provider
        value={{
          ...(draggable && !scrollEnabled && this.panRes),
          scrollEnabled,
          controlScroll: this.controlScroll,
          setChildScroll: this.setChildScroll,
        }}>
        <Animated.View
          onLayout={this.onLayout}
          style={[
            getRootStyle(style, height, Number(isReady)),
            {transform: [{translateY: this.animated}]},
          ]}>
          {draggable ? (
            <View {...this.panRes.panHandlers} style={[styles.rootDrag]}>
              {customDrag ? customDrag?.() : <View style={[styles.drag]} />}
            </View>
          ) : null}
          <View
            style={styles.flex1}
            {...(draggable &&
              draggableContent &&
              !hasChildScroll &&
              this.panRes.panHandlers)}>
            {children}
          </View>
        </Animated.View>
      </BottomSheetContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  shadow: {
    backgroundColor: 'white',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    shadowColor: '#000000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 5,
  },
  flex1: {
    flex: 1,
  },
  drag: {
    height: 2,
    borderRadius: 4,
    width: 40,
    backgroundColor: '#DEDFE1',
    marginVertical: 10,
  },
  rootDrag: {width: '100%', alignItems: 'center'},
});

export const BottomSheetContext = createContext<
  Partial<PanResponderInstance> & {
    scrollEnabled: boolean;
    controlScroll: (scrollEnabled: boolean) => void;
    setChildScroll: (has: boolean) => void;
  }
>({
  scrollEnabled: false,
  controlScroll: () => null,
  setChildScroll: () => null,
});

const useScroll = () => useContext(BottomSheetContext);

//-------- ScrollView --------//
const BottomSheetScrollView = (props: PropsWithChildren<ScrollViewProps>) => {
  const {scrollEnabled, controlScroll, setChildScroll, ...control} =
    useScroll();
  const scrollView = useRef<ScrollView>(null);
  const isToucheInScroll = useRef(false);

  useEffect(() => {
    setChildScroll(true);
    return () => {
      setChildScroll(false);
    };
  }, [setChildScroll]);

  const onScroll = useCallback(
    ({nativeEvent}: NativeSyntheticEvent<NativeScrollEvent>) => {
      if (nativeEvent.contentOffset.y <= 0 && isToucheInScroll.current) {
        scrollView.current?.scrollTo({y: 0, animated: false});
        controlScroll(false);
      }
    },
    [controlScroll],
  );

  const onScrollBeginDrag = useCallback(() => {
    isToucheInScroll.current = true;
  }, []);

  const onScrollEndDrag = useCallback(() => {
    isToucheInScroll.current = false;
  }, []);

  return (
    <ScrollView
      {...props}
      ref={scrollView}
      scrollEnabled={scrollEnabled}
      onScroll={onScroll}
      scrollEventThrottle={10}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      {...control.panHandlers}
    />
  );
};
//-------- ScrollView --------//
BottomSheet.ScrollView = BottomSheetScrollView;

//-------- FlatList --------//
const BottomSheetFlatList = <T,>(
  props: PropsWithChildren<FlatListProps<T>>,
) => {
  const {scrollEnabled, controlScroll, setChildScroll, ...control} =
    useScroll();
  const {onScroll: _onScroll, scrollEnabled: _scrollEnabled = true} = props;
  const scrollView = useRef<FlatList>(null);
  const isToucheInScroll = useRef(false);

  useEffect(() => {
    setChildScroll(true);
    return () => {
      setChildScroll(false);
    };
  }, [setChildScroll]);

  const onScroll = useCallback(
    (e: NativeSyntheticEvent<NativeScrollEvent>) => {
      _onScroll?.(e);
      const {nativeEvent} = e;
      if (nativeEvent.contentOffset.y <= 0 && isToucheInScroll.current) {
        scrollView.current?.scrollToOffset({offset: 0, animated: false});
        controlScroll(false);
      }
    },
    [_onScroll, controlScroll],
  );

  const onScrollBeginDrag = useCallback(() => {
    isToucheInScroll.current = true;
  }, []);

  const onScrollEndDrag = useCallback(() => {
    isToucheInScroll.current = false;
  }, []);

  return (
    <FlatList
      {...props}
      ref={scrollView}
      scrollEnabled={scrollEnabled && _scrollEnabled}
      onScroll={onScroll}
      scrollEventThrottle={10}
      onScrollBeginDrag={onScrollBeginDrag}
      onScrollEndDrag={onScrollEndDrag}
      {...control.panHandlers}
    />
  );
};
//-------- FlatList --------//
BottomSheet.FlatList = BottomSheetFlatList;

export default BottomSheet;

//-------- Utils --------//
const getRootStyle = (
  style: StyleProp<ViewStyle>,
  height: number[],
  opacity: number,
) => {
  const maxHeight = height?.length ? {height: Math.max(...height)} : {};
  return [styles.shadow, maxHeight, {opacity}, style, styles.root];
};

export const timingAnimated = (
  animated: Animated.Value | Animated.ValueXY,
  toValue: number,
  useNativeDriver = true,
  duration = 0,
) => {
  return Animated.timing(animated, {
    toValue,
    useNativeDriver,
    duration,
  });
};

export const springAnimated = (
  animated: Animated.Value | Animated.ValueXY,
  toValue: number | {x: number; y: number},
  useNativeDriver = true,
) => {
  return Animated.spring(animated, {
    bounciness: 0,
    overshootClamping: true,
    toValue,
    useNativeDriver,
  });
};
