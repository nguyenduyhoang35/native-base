import {addEventListener} from '@react-native-community/netinfo';
import {
  JSX,
  memo,
  PropsWithChildren,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Image,
  ImageBackground,
  PixelRatio,
  Platform,
  StatusBar,
} from 'react-native';
import {images} from 'assets';
import {showMessage} from 'react-native-flash-message';
import {useTranslate} from 'providers/Language';
import {requestTrackingPermission} from 'react-native-tracking-transparency';

const statusBarHeightPx = StatusBar.currentHeight || 0;
const statusBarHeightDp = Math.ceil(statusBarHeightPx / PixelRatio.get());

const SplashScreen = ({children}: PropsWithChildren) => {
  const translate = useTranslate();
  const initSuccess = useRef(false);
  const [loading, setLoading] = useState(true);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    requestTrackingPermission();
  }, []);

  useEffect(() => {
    if (!initSuccess.current) return;
    if (!isConnected) {
      showMessage({
        message: translate('network.nointernet'),
        type: 'warning',
        position: 'bottom',
        duration: 5000,
      });
    }
  }, [isConnected, translate]);

  useEffect(() => {
    if (!initSuccess.current) return;
    if (isConnected) setLoading(false);
  }, [isConnected]);

  useEffect(() => {
    const unsubscribe = addEventListener(state => {
      if (!initSuccess.current) initSuccess.current = true;
      setIsConnected(!!state.isConnected);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  if (!loading) return children as JSX.Element;
  return (
    <ImageBackground
      className="flex-1 items-center justify-center"
      style={{paddingTop: Platform.select({ios: 0, android: statusBarHeightDp})}}
      source={images.BackgroundSplash}>
      <Image
        style={{width: 290, height: 258}}
        source={images.LogoSplash}
      />
    </ImageBackground>
  );
};

export default memo(SplashScreen);
