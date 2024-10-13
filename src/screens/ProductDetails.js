import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetails = ({ route }) => {
  const { product, category } = route.params;
  const navigation = useNavigation();
  const [showFullDescription, setShowFullDescription] = useState(false); 

  const addToCart = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts/6', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          products: [{ productId: product.id, quantity: 1 }],
        }),
      });

      if (response.ok) {
        Alert.alert('Success', 'Product added to cart!');
        navigation.navigate('Cart');
      } else {
        Alert.alert('Error', 'Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      Alert.alert('Error', 'An error occurred while adding the product to the cart.');
    }
  };

  const deleteFromCart = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/carts/6', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        Alert.alert('Success', 'Product removed from cart!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('CategoryDetails', { category }),
          },
        ]);
      } else {
        Alert.alert('Error', 'Failed to remove product from cart.');
      }
    } catch (error) {
      console.error('Error deleting from cart:', error);
      Alert.alert('Error', 'An error occurred while removing the product from the cart.');
    }
  };


  const truncatedDescription = product.description.length > 100
    ? `${product.description.substring(0, 100)}...`
    : product.description;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.rating}>Rating: {product.rating.rate} ({product.rating.count} reviews)</Text>
      <Text style={styles.category}>Category: {product.category}</Text>

   
      <Text style={styles.description}>
        {showFullDescription ? product.description : truncatedDescription}
      </Text>

 
      {product.description.length > 100 && (
        <TouchableOpacity onPress={() => setShowFullDescription(!showFullDescription)}>
          <Text style={styles.readMoreText}>
            {showFullDescription ? 'Show Less' : 'Read More'}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={deleteFromCart}>
        <Text style={styles.buttonText}>Remove from Cart</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 130,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Regular',
    marginBottom: 10,
    color: 'black',
  },
  price: {
    fontSize: 20,
    color: 'black',
    marginBottom: 10,
    fontFamily: 'Poppins-Regular',
  },
  rating: {
    fontSize: 16,
    marginTop: 10,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  category: {
    fontSize: 14,
    color: 'black',
    marginBottom: 10,
       fontFamily: 'Poppins-Regular',
  },
  readMoreText: {
    color: '#900',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    marginBottom: 20,
    // backgroundColor:'blue',
    alignSelf:'baseline',
  
  },
  addToCartButton: {
    backgroundColor: '#900',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: '#f00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
});

export default ProductDetails;
