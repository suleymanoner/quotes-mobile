import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {MAIN_COLOR} from '../utils/Config';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';



const LandingScreen = () => {

  //const {navigate} = useNavigation();

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  
  const getStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('user_status')
      if(status === "ACTIVE") {
        setTimeout(() => {
          navigation.navigate('BottomTabStack')
        }, 1000);
      } else {
        setTimeout(() => {
          navigation.navigate('LoginPage')
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getStatus()
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require('../assets/images/quotes-logo.png')}
          style={styles.image}
        />
        <TouchableOpacity onPress={() => navigation.navigate('LoginPage')} >
          <Icon name='home' color={'black'} size={50} />
        </TouchableOpacity>
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
