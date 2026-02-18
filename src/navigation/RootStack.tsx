import { View, Text } from 'react-native'
import React from 'react'
import ProductDetailsScreen from '../screens/ProductDetailsScreen'
import CartScreen from '../screens/CartScreen'
import HomeScreen from '../screens/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainTabs from './MainTabs'

const Stack = createNativeStackNavigator();


const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName='Tabs' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name='Cart' component={CartScreen} />
      <Stack.Screen name="Details" component={ProductDetailsScreen} />
      <Stack.Screen name="Tabs" component={MainTabs} />
    </Stack.Navigator>
  )
}

export default RootStack