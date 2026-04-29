import {IconHome} from 'assets/svgs/bottom-bar/home';
import {IconReels} from 'assets/svgs/bottom-bar/reels';
import {IconFriends} from 'assets/svgs/bottom-bar/friends';
import {IconSearch} from 'assets/svgs/bottom-bar/search';
import {IconNotifications} from 'assets/svgs/bottom-bar/notifications';
import {IconUserDefault} from 'assets/svgs/bottom-bar/userDefault';
import {memo} from 'react';
import {Pressable, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {MaterialTopTabBarProps} from '@react-navigation/material-top-tabs';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {ScreenName} from 'types/react-navigation';
import {useColorScheme} from 'lib/useColorScheme';
import {Text} from 'components/nativewindui/Text';

type IconRenderer = (
  active: boolean,
  colorActive: string,
  colorDeactive?: string,
) => string;

type TabConfig = {
  name: ScreenName;
  icon: IconRenderer;
  badge?: number;
};

const TABS: TabConfig[] = [
  {name: ScreenName.HOME, icon: IconHome},
  {name: ScreenName.REELS, icon: IconReels, badge: 2},
  {name: ScreenName.FRIENDS, icon: IconFriends},
  {name: ScreenName.SEARCH, icon: IconSearch},
  {name: ScreenName.NOTIFICATIONS, icon: IconNotifications},
  {name: ScreenName.PROFILE, icon: IconUserDefault},
];

const BottomTabBar = ({state, navigation}: MaterialTopTabBarProps) => {
  const {colors, isDarkColorScheme} = useColorScheme();
  const {bottom} = useSafeAreaInsets();

  const activeName = state.routes[state.index]?.name;
  const inactiveColor = isDarkColorScheme ? '#b0b3b8' : '#65676b';

  return (
    <View
      className="bg-card border-t border-border"
      style={{paddingBottom: bottom}}>
      <View className="flex-row items-center justify-around h-12">
        {TABS.map(tab => {
          const isActive = activeName === tab.name;
          return (
            <Pressable
              key={tab.name}
              testID={`tab-${tab.name}`}
              accessibilityRole="button"
              accessibilityState={{selected: isActive}}
              onPress={() => navigation.navigate(tab.name)}
              className="flex-1 items-center justify-center h-full">
              <View>
                <SvgXml
                  width={26}
                  height={26}
                  xml={tab.icon(isActive, colors.primary, inactiveColor)}
                />
                {tab.badge ? (
                  <View className="absolute -top-1 -right-2 bg-destructive rounded-full min-w-[18px] h-[18px] items-center justify-center px-1">
                    <Text className="text-white text-[11px] font-semibold">
                      {tab.badge > 99 ? '99+' : tab.badge}
                    </Text>
                  </View>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default memo(BottomTabBar);
