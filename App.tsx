import React from 'react'
import { Image, StyleSheet, LogBox  } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { LandingScreen } from './src/screens/LandingScreen'

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
  }

})


const AppNavigation = createAppContainer(switchNavigator)

const App = () => {
  return(
    <AppNavigation />
    )
}

export default App;