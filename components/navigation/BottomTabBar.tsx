import {IconHome} from 'assets/svgs/bottom-bar/home';
import {IconSearch} from 'assets/svgs/bottom-bar/search';
import {IconUserDefault} from 'assets/svgs/bottom-bar/userDefault';
import {useColors} from 'providers/Theme';
import {memo, useCallback, useMemo} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {images} from 'assets';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shallowEqual, useSelector} from 'react-redux';
import {modeSelector} from 'store/slices/user';
import {ModeType} from 'types/user';
import FastImage from 'react-native-fast-image';

const BottomTabBar = ({state, navigation}: MaterialTopTabBarProps) => {
  const colors = useColors();
  const {bottom} = useSafeAreaInsets();
  const mode = useSelector(modeSelector, shallowEqual);

  const route = useMemo(
    () => state.routes.find((_, i) => i === state.index),
    [state.index, state.routes],
  );

  const getBg = useCallback(
    (name: string) => {
      if (route?.name === name) return colors.white;
      return 'transparent';
    },
    [colors.white, route?.name],
  );

  const goto = useCallback(
    (name: string) => {
      (navigation as any).navigate(name);
    },
    [navigation],
  );

  const opacityBg = useMemo(() => (mode === ModeType.DARK ? 0.8 : 0.9), [mode]);

  return (
    <View
      style={[
        styles.rootWrap,
        {bottom: bottom + Platform.select({android: 12, default: 6})},
      ]}>
      <View style={styles.root}>
        <FastImage
          source={images.bottomBar[mode]}
          style={[
            styles.background,
            StyleSheet.absoluteFill,
            {opacity: opacityBg},
          ]}
        />
        <View style={styles.content}>
          <Pressable
            style={[styles.icon, {backgroundColor: getBg('HOME')}]}
            onPress={() => goto('HOME')}>
            <SvgXml
              height={Platform.select({ios: 27, default: 20})}
              xml={IconHome(route?.name === 'HOME', colors.primary)}
            />
          </Pressable>
          <Pressable
            style={[styles.icon, {backgroundColor: getBg('SEARCH')}]}
            onPress={() => goto('SEARCH')}>
            <SvgXml
              height={Platform.select({ios: 25, default: 22})}
              xml={IconSearch(route?.name === 'SEARCH', colors.primary)}
            />
          </Pressable>
          <Pressable
            onPress={() => goto('PROFILE')}
            style={[styles.icon, {backgroundColor: getBg('PROFILE')}]}>
            <SvgXml
              height={Platform.select({ios: 27, default: 20})}
              xml={IconUserDefault(
                route?.name === 'PROFILE',
                colors.primary,
              )}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const BAR_HEIGHT = Platform.select({ios: 64, default: 60}) as number;
const ICON_SIZE = Platform.select({ios: 44, default: 40}) as number;

const styles = StyleSheet.create({
  rootWrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    alignItems: 'center',
  },
  root: {
    height: BAR_HEIGHT,
    width: '100%',
    maxWidth: 360,
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
    elevation: 12,
  },
  background: {
    borderRadius: BAR_HEIGHT / 2,
    overflow: 'hidden',
    height: BAR_HEIGHT,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  icon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(BottomTabBar);
