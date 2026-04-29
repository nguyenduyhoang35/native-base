import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList, ScreenName} from 'types/react-navigation';
import Home from './Home';
import Header from 'components/general/Header';

const Stack = createNativeStackNavigator<RootStackParamList>();

const Pages = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenName.HOME}
      screenOptions={{
        headerShown: false,
        header: props => <Header {...props} />,
      }}>
      <Stack.Screen name={ScreenName.HOME} component={Home} />
    </Stack.Navigator>
  );
};

export default Pages;
