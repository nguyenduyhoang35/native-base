import {Animated} from 'react-native';

export type TPagination = {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  order?: string;
};

export type AnimatedWithValue = Animated.Value & {_value: number};
