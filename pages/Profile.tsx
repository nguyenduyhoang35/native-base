import {View} from 'react-native';
import Text from 'components/core/Text';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text fs={24} fw={600}>
          Profile
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Profile;
