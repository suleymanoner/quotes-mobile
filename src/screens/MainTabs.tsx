import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {MAIN_COLOR} from '../utils/Config';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen} from './HomeScreen';
import { DailyPostScreen } from './DailyQuoteScreen';

const HomeStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomePage" component={HomeScreen} />
  </HomeStack.Navigator>
);

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor="black"
      barStyle={{backgroundColor: "#588AAA"}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
            tabBarLabel: "Home",
            tabBarColor: '#009387',
            tabBarIcon: ({color}) => (
                <Icon name='home' color={color} size={26} />
            )
        }}
      />
      <Tab.Screen
        name="DailyPostStack"
        component={DailyPostScreen}
        options={{
            tabBarLabel: "Daily Quote",
            tabBarColor: '#694fad',
            tabBarIcon: ({color}) => (
                <Icon name='format-quote-close' color={color} size={26} />
            )
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen;