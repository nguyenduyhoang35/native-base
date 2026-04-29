import {createContext, PropsWithChildren, useContext, useState} from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {useColors} from './Theme';

const SpinContext = createContext<(loading: boolean) => void>(() => null);

export const useSpin = () => useContext(SpinContext);

export const SpinProvider = ({children}: PropsWithChildren) => {
  const [loading, setLoading] = useState(false);
  const colors = useColors();

  return (
    <SpinContext.Provider value={setLoading}>
      {children}
      {loading ? (
        <View style={[styles.loading, StyleSheet.absoluteFill]}>
          <ActivityIndicator color={colors.primary} />
        </View>
      ) : null}
    </SpinContext.Provider>
  );
};

const styles = StyleSheet.create({
  loading: {
    zIndex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
