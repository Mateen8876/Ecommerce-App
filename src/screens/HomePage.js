import React, { useEffect, useState } from 'react';
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Header from '../Navigation/Header'; 
import Mic from 'react-native-vector-icons/Feather';
import Vertical from 'react-native-vector-icons/MaterialCommunityIcons';
import Right from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
    fetchProducts();
  }, []);

  const handleCategoryPress = (category) => {
    navigation.navigate('CategoryDetails', { category });
  };

  const toggleDescription = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const categoryImages = {
    electronics: require('../image/electronic.png'),
    jewelery: require('../image/jewe.png'),
    "men's clothing": require('../image/men.png'),
    "women's clothing": require('../image/women.png'),
  };

  return (
    <SafeAreaView style={styles.background}>
      <Header title="Home" />

  
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Mic name="search" size={30} color="#900" style={styles.searchIcon} />
          <TextInput style={styles.inputText} placeholder="Search Product" placeholderTextColor="black" />
        </View>
        <Mic name="mic" size={30} color="#900" style={styles.mic} />
      </View>

 
      <View style={styles.containerFeatured}>
        <Text style={styles.txt}>All Category</Text>
        <View style={styles.container2}>
          <View style={styles.shortContainer}>
            <Text style={styles.shortTxt}>Sort</Text>
            <Vertical name="compare-vertical" size={30} color="#232327" style={styles.short} />
          </View>

          <View style={styles.filterContainer}>
            <Text style={styles.filterTxt}>Filter</Text>
            <Mic name="filter" size={30} color="#232327" />
          </View>
        </View>
      </View>


      <View>
        {loading ? (
          <ActivityIndicator size="large" color="#900" />
        ) : (
          <FlatList
            data={categories}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleCategoryPress(item)}>
                <View style={styles.categoryContainer}>
                  <Image source={categoryImages[item] || require('../image/fashion.png')} style={styles.categoryImage} />
                  <Text style={styles.categoryText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item}
          />
        )}
      </View>


      <View style={styles.shopContainer}>
        <View style={styles.textDiscount}>
          <Text style={styles.discount}>50-40% OFF</Text>
          <Text style={styles.discount1}>Now in (product)</Text>
          <Text style={styles.discount2}>All colours</Text>
          <TouchableOpacity style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Shop Now</Text>
            <Right name="arrowright" size={25} color="#900" style={styles.right} />
          </TouchableOpacity>
        </View>
        <Image style={styles.girl} source={require('../image/girl.png')} />
      </View>


      <Text style={styles.productTxt}>All Products Here</Text>
      <ScrollView>
        <FlatList
          data={products}
          numColumns={2}
          renderItem={({ item }) => (
            <View style={styles.productContainer}>
              <Image source={{ uri: item.image }} style={styles.images} />
              <Text style={styles.flattxt}>{item.title}</Text>
              <Text style={styles.flattxt0}>
                {expanded[item.id] ? item.description : `${item.description.substring(0, 50)}...`}
              </Text>
              <TouchableOpacity onPress={() => toggleDescription(item.id)}>
                <Text style={styles.readMore}>
                  {expanded[item.id] ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.flattxt1}>${item.price}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.flatListContainer}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    fontFamily: 'Poppins-Regular',
    left: 12,
    fontSize: 14,
    width: '85%',
    color: 'black',
  },
  searchIcon: {
    left: 10,
  },
  mic: {
    right: 10,
  },
  containerFeatured: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    top: 10,
  },
  txt: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    left: 10,
  },
  container2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shortContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    elevation: 30,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    width: 80,
    height: 34,
    fontSize: 12,
  },
  shortTxt: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 30,
    width: 80,
    height: 34,
  },
  filterTxt: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  categoryContainer: {
    margin: 10,
    elevation: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  categoryImage: {
    width: 80,
    height: 70,
    resizeMode: 'contain',
  },
  categoryText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  shopContainer: {
    backgroundColor: '#FFC8D1',
    height: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 10,
    alignItems: 'center',
  },
  girl: {
    width: 180,
    height: 120,
    resizeMode: 'contain',
  },
  textDiscount: {
    marginLeft: 20,
  },
  discount: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
  },
  discount1: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  discount2: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },
  buttonContainer: {
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    marginTop: 5,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    marginRight: 5,
  },
  productTxt: {
    color: 'black',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    // textAlign: 'center',
    left:15,
    marginVertical: 10,
  },
  productContainer: {
    backgroundColor: 'white',
    margin: 5,
    elevation: 5,
    borderRadius: 10,
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  images: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  flattxt: {
    color: 'black',
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  flattxt0: {
    color: 'gray',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  flattxt1: {
    color: '#900',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  readMore: {
    color: '#900',
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    textAlign: 'center',
  },
  flatListContainer: {
    paddingHorizontal: 10,
  },
});
