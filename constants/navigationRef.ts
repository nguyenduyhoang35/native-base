import {NavigationContainerRef} from '@react-navigation/native';
import {createRef} from 'react';
import {RootStackParamList} from 'types/react-navigation';

export const navigationRef =
  createRef<NavigationContainerRef<RootStackParamList>>();
