import React from 'react';
import { GluestackUIProvider, Text } from "@gluestack-ui/themed"
import { config } from "@gluestack-ui/config"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProductListScreen from './src/screens/Products/Components/ProductListScreen';
import ProductDetailsScreen from './src/screens/Products/Components/ProductDetailsScreen';
import ProductScreen from './src/screens/Products/Components/ProductListScreen';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='ProductList'>
          <Stack.Screen name='Product Screen' component={ProductScreen} options={{
            title: 'Product List',
            headerShown: true,
          }} />
          <Stack.Screen name='Product List' component={ProductListScreen} options={{
            title: 'Product List',
            headerShown: true,
          }} />
          <Stack.Screen
            name='ProductDetails'
            component={ProductDetailsScreen}
            options={{
              title: 'Product Details',
              headerShown: true,
              headerBackTitleVisible: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </GluestackUIProvider>
  );
}
