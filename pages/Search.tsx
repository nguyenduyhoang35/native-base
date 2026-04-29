import {StyleSheet, View} from 'react-native';
import Text from 'components/Text';
import {SafeAreaView} from 'react-native-safe-area-context';

const Search = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Search</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  content: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  title: {fontSize: 24, fontWeight: '600'},
});

export default Search;
