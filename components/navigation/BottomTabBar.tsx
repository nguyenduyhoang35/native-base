import {IconHome} from 'assets/svgs/bottom-bar/home';
import {IconSearch} from 'assets/svgs/bottom-bar/search';
import {IconUserDefault} from 'assets/svgs/bottom-bar/userDefault';
import {memo} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {images} from 'assets';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenName} from 'types/react-navigation';
import FastImage from 'react-native-fast-image';
import {useColorScheme} from 'lib/useColorScheme';

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

const BAR_HEIGHT = Platform.select({ios: 64, default: 60}) as number;
const ICON_SIZE = Platform.select({ios: 44, default: 40}) as number;

const BottomTabBar = ({state, navigation}: MaterialTopTabBarProps) => {
  const {colors, colorScheme} = useColorScheme();
  const {bottom} = useSafeAreaInsets();

  const activeName = state.routes[state.index]?.name;
  const opacityBg = colorScheme === 'dark' ? 0.8 : 0.9;

  return (
    <View
      className="absolute left-4 right-4 items-center"
      style={{bottom: bottom + Platform.select({android: 12, default: 6})}}>
      <View
        className="relative w-full max-w-[360px]"
        style={shadowStyle.bar}>
        <FastImage
          source={images.bottomBar[colorScheme]}
          style={[
            shadowStyle.background,
            StyleSheet.absoluteFill,
            {opacity: opacityBg},
          ]}
        />
        <View className="flex-1 flex-row justify-around items-center px-[18px]">
          {TABS.map(tab => {
            const isActive = activeName === tab.name;
            return (
              <Pressable
                key={tab.name}
                testID={`tab-${tab.name}`}
                accessibilityRole="button"
                accessibilityState={{selected: isActive}}
                onPress={() => navigation.navigate(tab.name)}
                className="items-center justify-center rounded-full"
                style={[
                  iconStyle.size,
                  isActive ? iconStyle.activeBg : iconStyle.transparentBg,
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

const shadowStyle = StyleSheet.create({
  bar: {
    height: BAR_HEIGHT,
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
});

const iconStyle = StyleSheet.create({
  size: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  activeBg: {
    backgroundColor: '#ffffff',
  },
  transparentBg: {
    backgroundColor: 'transparent',
  },
});

export default memo(BottomTabBar);
