import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import BottomTabBar from 'components/navigation/BottomTabBar';
import {MainTabsParamList, ScreenName} from 'types/react-navigation';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';

const Tab = createMaterialTopTabNavigator<MainTabsParamList>();

const MainTabs = () => {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      tabBar={props => <BottomTabBar {...props} />}
      screenOptions={{swipeEnabled: false, animationEnabled: false}}>
      <Tab.Screen name={ScreenName.HOME} component={Home} />
      <Tab.Screen name={ScreenName.SEARCH} component={Search} />
      <Tab.Screen name={ScreenName.PROFILE} component={Profile} />
    </Tab.Navigator>
  );
};

export default MainTabs;
