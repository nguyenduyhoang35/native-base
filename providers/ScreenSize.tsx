import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from 'react';
import {Dimensions, LayoutChangeEvent, View} from 'react-native';
import {stylesGlobal} from 'styles/global';

const defaultContext = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

const ScreenSizeContext = createContext(defaultContext);

export const useScreenSize = () => useContext(ScreenSizeContext);

export const ScreenSizeProvider = ({children}: PropsWithChildren) => {
  const [size, setSize] = useState<typeof defaultContext | undefined>();

  const onLayout = useCallback(
    ({nativeEvent}: LayoutChangeEvent) => {
      const {layout} = nativeEvent;
      if (layout.width !== size?.width || layout.height !== size?.height) {
        setSize({width: layout.width, height: layout.height});
      }
    },
    [size?.height, size?.width],
  );

  return (
    <ScreenSizeContext.Provider value={size as typeof defaultContext}>
      <View style={stylesGlobal.flex1} onLayout={onLayout}>
        {!size ? null : children}
      </View>
    </ScreenSizeContext.Provider>
  );
};
