import {View} from 'react-native';
import {Text} from 'components/core';
import {SafeAreaView} from 'react-native-safe-area-context';

const Search = () => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Text fs={24} fw={600}>
          Search
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Search;
