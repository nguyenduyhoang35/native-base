import {RouteProp} from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export enum ScreenName {
  HOME = 'HOME',
}

export type RootStackParamList = {
  [ScreenName.HOME]: undefined;
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
