import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {HomeScreen} from './HomeScreen';
import { DailyPostScreen } from './DailyQuoteScreen';
import { ProfileScreen } from './ProfileScreen';
import { CommentScreen } from './CommentScreen';
import { SearchScreen } from './SearchScreen';
import { SettingScreen } from './SettingScreen';
import { PostQuoteScreen } from './PostQuoteScreen';
import { UserDetailScreen } from './UserDetailScreen';
import { FollowerListScreen } from './FollowerListScreen';
import { EditProfileScreen } from './EditProfileScreen';
import { MAIN_COLOR } from '../utils/Config';

const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();
const SearchStack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const HomeStackScreen = () => (
  <HomeStack.Navigator screenOptions={{headerShown: false}}>
    <HomeStack.Screen name="HomePage" component={HomeScreen} />
    <HomeStack.Screen name="CommentsPage" component={CommentScreen} />
    <HomeStack.Screen name="PostQuotePage" component={PostQuoteScreen} />
    <HomeStack.Screen name="UserDetailPage" component={UserDetailScreen} />
    <HomeStack.Screen name="FollowerListPage" component={FollowerListScreen} />
  </HomeStack.Navigator>
);

const ProfileStackScreen = () => (
  <ProfileStack.Navigator screenOptions={{headerShown: false}}>
    <ProfileStack.Screen name="ProfilePage" component={ProfileScreen} />
    <ProfileStack.Screen name="CommentsPage" component={CommentScreen} />
    <ProfileStack.Screen name="SettingPage" component={SettingScreen} />
    <ProfileStack.Screen name="FollowerListPage" component={FollowerListScreen} />
    <ProfileStack.Screen name="UserDetailPage" component={UserDetailScreen} />
    <ProfileStack.Screen name="EditProfilePage" component={EditProfileScreen} />
  </ProfileStack.Navigator>
);

const SearchStackScreen = () => (
  <SearchStack.Navigator screenOptions={{headerShown: false}}>
    <SearchStack.Screen name='SearchPage' component={SearchScreen} />
    <SearchStack.Screen name='UserDetailPage' component={UserDetailScreen} />
    <SearchStack.Screen name="FollowerListPage" component={FollowerListScreen} />
  </SearchStack.Navigator>
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
            tabBarColor: MAIN_COLOR,
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
            tabBarColor: MAIN_COLOR,
            tabBarIcon: ({color}) => (
                <Icon name='format-quote-close' color={color} size={26} />
            )
        }}
      />
      <Tab.Screen
        name="SearchStack"
        component={SearchStackScreen}
        options={{
            tabBarLabel: "Search",
            tabBarColor: MAIN_COLOR,
            tabBarIcon: ({color}) => (
                <Icon name='magnify' color={color} size={26} />
            )
        }}
      />
      <Tab.Screen
        name="ProfileScreenStack"
        component={ProfileStackScreen}
        options={{
            tabBarLabel: "Profile",
            tabBarColor: MAIN_COLOR,
            tabBarIcon: ({color}) => (
                <Icon name='account-circle' color={color} size={26} />
            )
        }}
      />
    </Tab.Navigator>
)

export default MainTabScreen;