import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ApplicationState, UserState, onGetUser} from '../redux';
import {MAIN_COLOR} from '../utils/Config';
import {connect} from 'react-redux';
import {useNavigation} from '../utils/useNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import LottieView from "lottie-react-native";

interface ConfirmationScreenProps {
  navigation: {getParam: Function};
  userReducer: UserState;
  onGetUser: Function;
}

const _ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({userReducer, onGetUser}) => {
  const {navigate} = useNavigation();

  const {user} = userReducer;

  const checkActive = async () => {

    const id = await AsyncStorage.getItem('user_id')
    onGetUser(id);

    if (user.status == 'ACTIVE') {
      navigate('HomePage');
    } else {
      console.log('not active yet!!!');
    }
  };

  useEffect(() => {
    checkActive();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>"Please confirm your account"</Text>
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
    fontSize: 45,
    marginBottom: 40,
    marginTop: 60,
    fontFamily: 'bahnschrift',
    color: 'black',
    textAlign: 'center',
  },
});
