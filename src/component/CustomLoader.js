import {ActivityIndicator, StyleSheet, View} from 'react-native';

export default function CustomLoader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={'#92bc2a'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});
