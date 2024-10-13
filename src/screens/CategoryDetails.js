import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import Header from '../Navigation/Header';
import Mic from 'react-native-vector-icons/Feather';

const CategoryDetails = ({ route, navigation }) => {
  const { category } = route.params; 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetails', { product, category });
  };

  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Mic name="search" size={20} color="#900" style={styles.searchIcon} />
          <TextInput
            style={styles.inputText}
            placeholder="Search Product"
            placeholderTextColor="black"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#900" />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleProductPress(item)} style={styles.productTouchable}>
              <View style={styles.productContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
                <View style={styles.productDetails}>
                  <Text style={styles.productTitle}>{item.title}</Text>
                  <Text style={styles.productPrice}>${item.price}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'black',
    marginLeft: 10,
    flex: 1,
  },
  productTouchable: {
    marginBottom: 20,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  productImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  productPrice: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
});

export default CategoryDetails;
