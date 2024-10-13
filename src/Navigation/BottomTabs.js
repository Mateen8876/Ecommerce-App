import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from '../screens/HomePage';
import Favorites from './Favorites';
import Profile from './Profile';
import Settings from './Settings';
import Icon from 'react-native-vector-icons/AntDesign';
import Carttab from './Carttab';
import { Text, StyleSheet } from 'react-native';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Favorites') {
            iconName = 'hearto';
          } else if (route.name === 'Cart') {
            iconName = 'shoppingcart';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          } else if (route.name === 'Settings') {
            iconName = 'setting';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarLabel: ({ color }) => (
          <Text style={[styles.tabLabel, { color }]}>
            {route.name}
          </Text>
        ),
        tabBarActiveTintColor: '#900',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'white',
          borderTopWidth: 0,
          elevation: 5,
          paddingBottom: 5,
          borderTopLeftRadius:20,
          borderTopRightRadius:20,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Cart" component={Carttab} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabLabel: {
    fontFamily: 'Poppins-Regular', 
    fontSize: 12, 
  },
});

export default BottomTabs;
