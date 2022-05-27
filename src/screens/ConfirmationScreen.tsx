import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ApplicationState, UserState, Response, onGetUser, UserModel} from '../redux';
import {BASE_URL, MAIN_COLOR} from '../utils/Config';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LottieView from "lottie-react-native";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import axios from 'axios';

interface ConfirmationScreenProps {
  navigation: {getParam: Function};
  userReducer: UserState;
  onGetUser: Function;
}

const _ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({userReducer, onGetUser}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  const {user} = userReducer;

  const [storageUser, setStorageUser] = useState<UserModel>()


  const getUserFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('user_id')

      if(id !== undefined) {
        if(id) {
          await axios.get<Response & UserModel>(`${BASE_URL}users/${id}`)
          .then(response => {
            if(response.data.response) {
              setStorageUser(response.data.response)
            }
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const checkActive = async () => {
    try {
      if (storageUser?.status == 'ACTIVE') {
        navigation.navigate('BottomTabStack');
      } else {
        console.log('not active yet!!!');
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    let unmounted = false

    if(!unmounted) {
      getUserFromStorage()
      checkActive();
    }
    return () => {
        unmounted = true 
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>"Please check your email and confirm your account!"</Text>
      <LottieView 
          source={require('../assets/images/loading.json')}
          autoPlay
          loop
      />
    </View>
  );
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const ConfirmationScreen = connect(mapToStateProps, {onGetUser})(
  _ConfirmationScreen,
);

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
    marginRight: 10
  },
});
