import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Response, UserModel} from '../redux';
import {BASE_URL, MAIN_COLOR} from '../utils/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import axios from 'axios';

const ConfirmationScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [storageUser, setStorageUser] = useState<UserModel>();

  const getUserFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('user_id');

      if (id !== undefined) {
        await axios
          .get<Response & UserModel>(`${BASE_URL}users/${id}`)
          .then(response => {
            if (response.data.response) {
              setStorageUser(response.data.response);
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkActive = () => {
    if (storageUser?.status == 'ACTIVE') {
      navigation.navigate('BottomTabStack');
    } else {
      console.log('not active yet!!!');
    }
  };

  useEffect(() => {
    getUserFromStorage();
  });

  useEffect(() => {
    checkActive();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        "Please check your email and confirm your account!"
      </Text>
      <LottieView
        source={require('../assets/images/loading.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export {ConfirmationScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: MAIN_COLOR,
  },
  title: {
    fontSize: 30,
    marginBottom: 40,
    marginTop: 60,
    fontFamily: 'bahnschrift',
    color: 'white',
    textAlign: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
});
