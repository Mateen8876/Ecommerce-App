import React from 'react';
import { SafeAreaView, Text, StyleSheet, FlatList, View } from 'react-native';

const Carttab = () => {

  const cartItems = [
    { id: '1', name: 'Product 1', price: 20 },
    { id: '2', name: 'Product 2', price: 15 },
    { id: '3', name: 'Product 3', price: 30 },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <Text style={styles.itemPrice}>${item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: ${cartItems.reduce((total, item) => total + item.price, 0)}</Text>
      </View>
    </SafeAreaView>
  );
};

export default Carttab;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Poppins-SemiBold',
    color: 'black',
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  itemPrice: {
    fontSize: 20,
    color: 'black',
  },
  totalContainer: {
    marginTop: 20,
    paddingVertical: 10,
    borderTopWidth: 2,
    borderTopColor: '#900',
    width: '100%',
  },
  totalText: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: '#900',
  },
});
