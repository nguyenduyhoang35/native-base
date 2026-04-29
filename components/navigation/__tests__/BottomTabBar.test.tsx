import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import {Provider} from 'react-redux';
import {configureStore} from '@reduxjs/toolkit';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import userReducer from 'store/slices/user';
import {ScreenName} from 'types/react-navigation';
import BottomTabBar from '../BottomTabBar';

jest.mock('react-native-fast-image', () => 'FastImage');

const buildState = (index: number) => ({
  index,
  key: 'tab-test',
  routeNames: [ScreenName.HOME, ScreenName.SEARCH, ScreenName.PROFILE],
  routes: [
    {key: 'home', name: ScreenName.HOME},
    {key: 'search', name: ScreenName.SEARCH},
    {key: 'profile', name: ScreenName.PROFILE},
  ],
  type: 'tab',
  history: [],
  stale: false as const,
});

const renderBar = (activeIndex = 0) => {
  const navigate = jest.fn();
  const store = configureStore({reducer: {user: userReducer}});
  const props = {
    state: buildState(activeIndex) as any,
    navigation: {navigate, emit: jest.fn()} as any,
    descriptors: {} as any,
    insets: {top: 0, right: 0, bottom: 0, left: 0},
    layout: {width: 360, height: 64},
    position: {interpolate: jest.fn()} as any,
    jumpTo: jest.fn(),
  };
  const utils = render(
    <Provider store={store}>
      <SafeAreaProvider
        initialMetrics={{
          frame: {x: 0, y: 0, width: 360, height: 800},
          insets: {top: 0, left: 0, right: 0, bottom: 0},
        }}>
        <BottomTabBar {...props} />
      </SafeAreaProvider>
    </Provider>,
  );
  return {...utils, navigate};
};

describe('BottomTabBar', () => {
  it('renders one button per tab', () => {
    const {getByTestId} = renderBar();
    expect(getByTestId(`tab-${ScreenName.HOME}`)).toBeTruthy();
    expect(getByTestId(`tab-${ScreenName.SEARCH}`)).toBeTruthy();
    expect(getByTestId(`tab-${ScreenName.PROFILE}`)).toBeTruthy();
  });

  it('navigates to the route when tab is pressed', () => {
    const {getByTestId, navigate} = renderBar();
    fireEvent.press(getByTestId(`tab-${ScreenName.SEARCH}`));
    expect(navigate).toHaveBeenCalledWith(ScreenName.SEARCH);
  });

  it('marks the active tab as selected', () => {
    const {getByTestId} = renderBar(2);
    expect(
      getByTestId(`tab-${ScreenName.PROFILE}`).props.accessibilityState
        .selected,
    ).toBe(true);
    expect(
      getByTestId(`tab-${ScreenName.HOME}`).props.accessibilityState.selected,
    ).toBe(false);
  });

});
