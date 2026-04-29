import {
  Dispatch,
  JSX,
  PropsWithChildren,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
import {
  check,
  PERMISSIONS,
  PermissionStatus,
  request,
  RESULTS,
} from 'react-native-permissions';

type Props = {
  setPermission?: Dispatch<SetStateAction<PermissionStatus>>;
};

const RequestAndroidPer = ({
  setPermission,
  children,
}: PropsWithChildren<Props>) => {
  const hasAndroidPermission = useCallback(async () => {
    if (Number(Platform.Version) >= 33) {
      const status = await check(
        PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
      );
      return ['granted', 'limited'].includes(status);
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  }, []);

  const getRequestPermissionPromise = useCallback(async () => {
    await new Promise<void>(res => setTimeout(() => res(), 500));
    await PermissionsAndroid.request(PERMISSIONS.ANDROID.READ_MEDIA_VIDEO);
    await PermissionsAndroid.request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    if (!(await hasAndroidPermission())) return setPermission?.('granted');
    if (Number(Platform.Version) >= 33) {
      const status = await request(
        PERMISSIONS.ANDROID.READ_MEDIA_VISUAL_USER_SELECTED,
      );
      setPermission?.(status);
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => setPermission?.(status as PermissionStatus));
    }
  }, [hasAndroidPermission, setPermission]);

  const requestPermissionAndGetPhotos = useCallback(async () => {
    if (Platform.OS === 'android') return getRequestPermissionPromise();
    let status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    if (status === RESULTS.DENIED) {
      status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    }
    setPermission?.(status);
  }, [getRequestPermissionPromise, setPermission]);

  useEffect(() => {
    requestPermissionAndGetPhotos();
  }, [requestPermissionAndGetPhotos]);

  return children as JSX.Element;
};

export default RequestAndroidPer;
