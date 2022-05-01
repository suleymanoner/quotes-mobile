import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen} from './HomeScreen';
import { DailyPostScreen } from './DailyQuoteScreen';
import { ProfileScreen } from './ProfileScreen';
import { PostDetailScreen } from './PostDetailScreen';
import { MAIN_COLOR } from '../utils/Config';

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomePage" component={HomeScreen} />
    <HomeStack.Screen name="PostDetailPage" component={PostDetailScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="ProfilePage" component={ProfileScreen} />
  </ProfileStack.Navigator>
);

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="HomeStack"
      activeColor="white"
      barStyle={{backgroundColor: MAIN_COLOR}}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStackScreen}
        options={{
            tabBarLabel: "Home",
            tabBarColor: '#009387',
            tabBarIcon: ({color, focused}) => (
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
      <Tab.Screen
        name="ProfileScreenStack"
        component={ProfileStackScreen}
        options={{
            tabBarLabel: "Profile",
            tabBarColor: '#694fad',
            tabBarIcon: ({color}) => (
                <Icon name='account-circle' color={color} size={26} />
            )
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen;