import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {useNavigation} from '../utils/useNavigation';
import {MAIN_COLOR} from '../utils/Config';
import LottieView from "lottie-react-native";

const LandingScreen = () => {
  const {navigate} = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigate('loginStack');
    }, 1000);
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
          source={require('../assets/images/quotes-icon.png')}
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
    width: 150,
    height: 150,
  },
  text: {
    fontSize: 55,
    marginBottom: 50,
    fontFamily: 'Aleo-Regular',
    color: 'black',
  },
});
