import {IconHome} from 'assets/svgs/bottom-bar/home';
import {IconSearch} from 'assets/svgs/bottom-bar/search';
import {IconUserDefault} from 'assets/svgs/bottom-bar/userDefault';
import {useColors} from 'providers/Theme';
import {memo} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {images} from 'assets';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {shallowEqual, useSelector} from 'react-redux';
import {modeSelector} from 'store/slices/user';
import {ModeType} from 'types/user';
import {ScreenName} from 'types/react-navigation';
import FastImage from 'react-native-fast-image';

type IconRenderer = (active: boolean, color: string) => string;

type TabConfig = {
  name: ScreenName;
  icon: IconRenderer;
  height: number;
};

const TABS: TabConfig[] = [
  {
    name: ScreenName.HOME,
    icon: IconHome,
    height: Platform.select({ios: 27, default: 20}) as number,
  },
  {
    name: ScreenName.SEARCH,
    icon: IconSearch,
    height: Platform.select({ios: 25, default: 22}) as number,
  },
  {
    name: ScreenName.PROFILE,
    icon: IconUserDefault,
    height: Platform.select({ios: 27, default: 20}) as number,
  },
];

const BottomTabBar = ({state, navigation}: MaterialTopTabBarProps) => {
  const colors = useColors();
  const {bottom} = useSafeAreaInsets();
  const mode = useSelector(modeSelector, shallowEqual);

  const activeName = state.routes[state.index]?.name;
  const opacityBg = mode === ModeType.DARK ? 0.8 : 0.9;

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
          {TABS.map(tab => {
            const isActive = activeName === tab.name;
            return (
              <Pressable
                key={tab.name}
                onPress={() => navigation.navigate(tab.name)}
                style={[
                  styles.icon,
                  {backgroundColor: isActive ? colors.white : 'transparent'},
                ]}>
                <SvgXml
                  height={tab.height}
                  xml={tab.icon(isActive, colors.primary)}
                />
              </Pressable>
            );
          })}
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
