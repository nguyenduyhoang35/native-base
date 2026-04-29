import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useColorScheme} from 'lib/useColorScheme';

const SpinContext = createContext<(loading: boolean) => void>(() => null);

export const useSpin = () => useContext(SpinContext);

export const SpinProvider = ({children}: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const {colors} = useColorScheme();

  return (
    <SpinContext.Provider value={setLoading}>
      {children}
      {loading ? (
        <View
          className="absolute inset-0 z-10 w-full h-full items-center justify-center"
          style={StyleSheet.absoluteFill}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : null}
    </SpinContext.Provider>
  );
};
