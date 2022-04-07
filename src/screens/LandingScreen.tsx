import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {useNavigation} from '../utils/useNavigation';
import {MAIN_COLOR} from '../utils/Config';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-community/async-storage';


const LandingScreen = () => {

  const {navigate} = useNavigation();


  const getStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('user_status')
      if(status === "ACTIVE") {
        setTimeout(() => {
          navigate('home');
        }, 1000);
      } else {
        setTimeout(() => {
          navigate('LoginPage');
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  

  useEffect(() => {
    getStatus()
  }, []);

  /*
    <LottieView 
          source={require('../assets/images/loading-blocks.json')}
          autoPlay
          loop
        />
  */

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require('../assets/images/quotes-logo.png')}
          style={styles.image}
        />
        <Text style={styles.text}>"Quotes"</Text>
      </View>
    </View>
  );
};

export {LandingScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  text: {
    fontSize: 60,
    marginBottom: 50,
    fontFamily: 'bahnschrift',
    color: 'black'
  },
});
