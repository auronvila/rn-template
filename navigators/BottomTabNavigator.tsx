import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Text} from 'react-native'; // Import Text from 'react-native'
import HomeScreen from "../screens/private/HomeScreen";
import {ROUTES} from "../constants";
import ProfileScreen from "../screens/private/ProfileScreen";
import {AntDesign, Entypo, FontAwesome} from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function HomeTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>
              Home
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <Entypo name="home" size={24} color={color}/>
            ) : (
              <AntDesign name="home" size={24} color={color}/>
            ),
        }}
        name={ROUTES.HOME}
        component={HomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({color, focused}) => (
            <Text style={{color: color, fontSize: 12, marginTop: -7}}>
              Profile
            </Text>
          ),
          tabBarIcon: ({focused, color, size}) =>
            focused ? (
              <FontAwesome name="user" size={24} color={color}/>
            ) : (
              <FontAwesome name="user-o" size={24} color={color}/>
            ),
        }}
        name={ROUTES.PROFILE_SCREEN}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
