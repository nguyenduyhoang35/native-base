import {View} from 'react-native';
import {Text} from 'components/nativewindui/Text';
import {SafeAreaView} from 'react-native-safe-area-context';

const Search = () => {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center">
        <Text variant="title1">Search</Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;
