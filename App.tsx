import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from 'store';
import {LanguageProvider} from 'providers/Language';
import {ScreenSizeProvider} from 'providers/ScreenSize';
import FlashMessage from 'react-native-flash-message';
import {Platform, StatusBar} from 'react-native';
import {useEffect} from 'react';
import {FormProvider} from '@rn-form/form';
import {Text} from 'components/core';
import SplashScreen from 'components/SplashScreen';
import 'config/axios';
import {PortalProvider} from 'components/general/Portal';
import {NavigationContainer} from '@react-navigation/native';
import Pages from 'pages';
import {navigationRef} from 'constants/navigationRef';
import {SpinProvider} from 'providers/Spin';
import {SockerProvider} from 'providers/Socket';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {stylesGlobal} from 'styles/global';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  useEffect(() => {
    if (Platform.OS !== 'android') return;
    StatusBar.setTranslucent(true);
    StatusBar.setBackgroundColor('transparent');
  }, []);

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <LanguageProvider>
          <ScreenSizeProvider>
            <SplashScreen>
              <GestureHandlerRootView style={stylesGlobal.flex1}>
                <FormProvider Text={Text}>
                  <SafeAreaProvider>
                    <SpinProvider>
                      <NavigationContainer ref={navigationRef}>
                        <PortalProvider>
                          <SockerProvider>
                            <Pages />
                          </SockerProvider>
                        </PortalProvider>
                      </NavigationContainer>
                    </SpinProvider>
                    <FlashMessage
                      position="top"
                      style={{
                        paddingTop: Platform.select({
                          android: 30,
                          default: 0,
                        }),
                      }}
                    />
                  </SafeAreaProvider>
                </FormProvider>
              </GestureHandlerRootView>
            </SplashScreen>
          </ScreenSizeProvider>
        </LanguageProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
