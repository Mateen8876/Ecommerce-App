import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabs from './src/Navigation/BottomTabs';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryDetails from './src/screens/CategoryDetails';
import ProductDetails from './src/screens/ProductDetails';
import Cart from './src/screens/Cart';
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs" screenOptions={{headerShown:false}}>
        <Stack.Screen 
          name="MainTabs" 
          component={BottomTabs} 
          options={{ headerShown: false }} 
        />
        
      
        <Stack.Screen
          name="CategoryDetails" 
          component={CategoryDetails} 
          options={{ title: 'Category Details' }} 
        />
        <Stack.Screen 
          name="ProductDetails" 
          component={ProductDetails} 
          options={{ title: 'Product Details' }} 
        />
        <Stack.Screen 
          name="Cart" 
          component={Cart} 
          options={{ title: 'My Cart' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;




