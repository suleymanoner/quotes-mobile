import React, {useEffect, useState} from 'react';
import {LogBox} from 'react-native';
import {LoginScreen} from './src/screens/LoginScreen';
import {ConfirmationScreen} from './src/screens/ConfirmationScreen';
import {Provider} from 'react-redux';
import {store} from './src/redux';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainTabScreen from './src/screens/MainTabs';
import FlashMessage from 'react-native-flash-message';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);


export type RootStackParams = {
  LoginStack;
  BottomTabStack;
};

const LoginStack = createNativeStackNavigator();

const LoginStackScreens = () => (
  <LoginStack.Navigator screenOptions={{headerShown: false}}>
    <LoginStack.Screen name="LoginPage" component={LoginScreen} />
    <LoginStack.Screen name="ConfirmationPage" component={ConfirmationScreen} />
  </LoginStack.Navigator>
);



const RootStack = createNativeStackNavigator<RootStackParams>();


const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return(
    <Provider store={store}>
        <NavigationContainer>
          <RootStack.Navigator
            initialRouteName="LoginStack"
            screenOptions={{headerShown: false}}>
            <RootStack.Screen name="LoginStack" component={LoginStackScreens} />
            <RootStack.Screen name="BottomTabStack" component={MainTabScreen} />
          </RootStack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" />
      </Provider>
  )
};

export default App;
