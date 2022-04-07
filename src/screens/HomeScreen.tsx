import React, { useEffect } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {UserModel, ApplicationState, UserState, onGetUser} from '../redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

interface HomeScreenProps {
  userReducer: UserState;
  navigation: {getParam: Function};
  onGetUser: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({userReducer, onGetUser}) => {
  //const {getParam} = props.navigation;

  const {user, error} = userReducer;

  console.log(user);
  console.log(error);

  const getUser = async () => {
    const id = await AsyncStorage.getItem('user_id')
    onGetUser(id);
  }


  useEffect(() => {

    getUser()

  }, [])


  return (
    <View>
      <Text>Home</Text>
      <Text>{user.name}</Text>
      <Text>{user.surname}</Text>
      <Text>{user.email}</Text>

      <Image
          source={{uri: user.profile_photo}}
          style={styles.image}
        />

    </View>
  );
};


const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
})


const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const HomeScreen = connect(mapToStateProps, {onGetUser})(_HomeScreen);

export {HomeScreen};
