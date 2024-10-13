import React from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const Profile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Profile Screen</Text>
    </SafeAreaView>
  );
};

export default Profile;

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
