import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Favorites = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Favorites Screen</Text>
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
  },
});
