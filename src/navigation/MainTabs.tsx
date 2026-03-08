import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from '@react-native-vector-icons/fontawesome';

const { height, width } = Dimensions.get('window');

const Tab = createBottomTabNavigator();

const MainTabs = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle:{
                    height: height*0.08,
                },
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    margin: 5
                }
            }}
           
        >
            <Tab.Screen
                name="Cart"
                component={CartScreen}
                options={{
                    tabBarActiveTintColor: '#0A3D91',
                    tabBarIcon: ({ focused }: any) => (
                        <FontAwesome name='cart-arrow-down' size={24} color={focused ? '#0A3D91' : '#000'} />
                    )
                }}
            />
            
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarActiveTintColor: '#0A3D91',
                    tabBarIcon: ({ focused }: any) => (
                        <FontAwesome name='home' size={24} color={focused ? '#0A3D91' : '#000'} />
                    )
                }}
            />

            
        </Tab.Navigator>
    );
};

export default MainTabs;