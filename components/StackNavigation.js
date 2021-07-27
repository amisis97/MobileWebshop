import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '../pages/ProductScreen';
import { SafeAreaView } from 'react-native-safe-area-context';
import HomeScreen from '../pages/HomeScreen';

const Stack = createStackNavigator();


export default StackAppNavigator = () => (
  <SafeAreaView style={{ flex: 1 }}>
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Product' component={ProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);