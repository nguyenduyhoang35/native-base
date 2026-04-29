import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, ScreenName} from 'types/react-navigation';
import MainTabs from './MainTabs';
import Header from 'components/general/Header';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Pages = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.MAIN_TABS}
      screenOptions={{
        headerShown: false,
        header: props => <Header {...props} />,
      }}>
      <Stack.Screen name={ScreenName.MAIN_TABS} component={MainTabs} />
    </Stack.Navigator>
  );
};

export default Pages;
