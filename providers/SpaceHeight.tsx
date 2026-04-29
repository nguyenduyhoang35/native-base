import {springAnimated} from 'components/general/BottomSheet';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useRef,
} from 'react';
import {Animated} from 'react-native';
import {stylesGlobal} from 'styles/global';

type TSpaceHeightContext = (toValue: number, animated?: boolean) => void;

const SpaceHeightContext = createContext<TSpaceHeightContext>(() => null);

export const useSpace = () => useContext(SpaceHeightContext);

export const SpaceProvider = ({children}: PropsWithChildren) => {
  const animated = useRef(new Animated.Value(0));

  const onShow = useCallback((toValue: number, animation: boolean = true) => {
    if (!animation) {
      animated.current.setValue(0);
    } else springAnimated(animated.current, toValue).start();
  }, []);

  return (
    <SpaceHeightContext.Provider value={onShow}>
      <Animated.View
        style={[
          {transform: [{translateY: animated.current}]},
          stylesGlobal.flex1,
        ]}>
        {children}
      </Animated.View>
    </SpaceHeightContext.Provider>
  );
};
