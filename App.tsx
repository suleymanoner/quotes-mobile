import React from 'react'
import { Image, StyleSheet, LogBox  } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { LandingScreen } from './src/screens/LandingScreen'
import { LoginScreen } from './src/screens/LoginScreen'
import { HomeScreen } from './src/screens/HomeScreen'
import { ConfirmationScreen } from './src/screens/ConfirmationScreen'
import { Provider } from 'react-redux';
import { store } from './src/redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {MAIN_COLOR} from './src/utils/Config';


import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MainTabScreen from './src/screens/MainTabs'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

export type RootStackParams = {
  LandingPage,
  LoginPage,
  BottomTabStack
}

const RootStack = createNativeStackNavigator<RootStackParams>();

const App = () => {
  return(
    <Provider store={store} >
      <NavigationContainer>
        <RootStack.Navigator initialRouteName='LandingPage' screenOptions={{headerShown: false}} >
          <RootStack.Screen name='LandingPage' component={LandingScreen} />
          <RootStack.Screen name="LoginPage" component={LoginScreen} />
          <RootStack.Screen name="BottomTabStack" component={MainTabScreen} />
        </RootStack.Navigator>
      </NavigationContainer>
    </Provider>
    )
}

export default App;
