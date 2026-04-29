import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum ScreenName {
  MAIN_TABS = 'MAIN_TABS',
  HOME = 'HOME',
  REELS = 'REELS',
  FRIENDS = 'FRIENDS',
  SEARCH = 'SEARCH',
  NOTIFICATIONS = 'NOTIFICATIONS',
  PROFILE = 'PROFILE',
}

export type RootStackParamList = {
  [ScreenName.MAIN_TABS]: undefined;
  [ScreenName.HOME]: undefined;
  [ScreenName.REELS]: undefined;
  [ScreenName.FRIENDS]: undefined;
  [ScreenName.SEARCH]: undefined;
  [ScreenName.NOTIFICATIONS]: undefined;
  [ScreenName.PROFILE]: undefined;
};

export type MainTabsParamList = {
  [ScreenName.HOME]: undefined;
  [ScreenName.REELS]: undefined;
  [ScreenName.FRIENDS]: undefined;
  [ScreenName.SEARCH]: undefined;
  [ScreenName.NOTIFICATIONS]: undefined;
  [ScreenName.PROFILE]: undefined;
};

export type TUseNavigation = NativeStackNavigationProp<RootStackParamList>;

export type TUseRoute<T extends keyof RootStackParamList> = RouteProp<
  RootStackParamList,
  T
>;

export type NativeProps<
  T extends keyof RootStackParamList,
  NavigatorID extends string | undefined = undefined,
> = NativeStackScreenProps<RootStackParamList, T, NavigatorID>;
