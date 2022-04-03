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


LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },

  loginStack: {
    screen: createStackNavigator({
      LoginPage: LoginScreen,
      ConfirmationPage: ConfirmationScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  },

  homeStack: {
    screen: createStackNavigator({
      HomePage: HomeScreen
    }, {
      defaultNavigationOptions: {
        headerShown: false
      }
    })
  }

})


const AppNavigation = createAppContainer(switchNavigator)

const App = () => {
  return(
    <Provider store={store} >
      <AppNavigation />
    </Provider>
    )
}

export default App;