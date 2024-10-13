import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cart = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontFamily: 'Poppins-Regular',
  },
});

export default Cart;
