import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const Header = ({ title }) => {
  return (
    <View style={styles.headerContainer}>
      <Icon name="menu" size={30} color="#900" style={styles.menu} />
      <View style={styles.headerLogoContainer}>
     
        <Image source={require('../image/logo.png')} style={styles.logo} />
    
      </View>
      <Image style={styles.profile} source={require('../image/profile.png')} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
  },
  headerLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 160,
    height: 50,
    resizeMode: 'cover',
    marginRight: 10, 
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  profile: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
