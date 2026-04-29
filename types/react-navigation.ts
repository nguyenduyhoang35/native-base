import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum ScreenName {
  MAIN_TABS = 'MAIN_TABS',
  HOME = 'HOME',
  SEARCH = 'SEARCH',
  PROFILE = 'PROFILE',
}

export type RootStackParamList = {
  [ScreenName.MAIN_TABS]: undefined;
  [ScreenName.HOME]: undefined;
  [ScreenName.SEARCH]: undefined;
  [ScreenName.PROFILE]: undefined;
};

export type MainTabsParamList = {
  [ScreenName.HOME]: undefined;
  [ScreenName.SEARCH]: undefined;
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
