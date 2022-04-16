import React, { useEffect } from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {UserModel, ApplicationState, UserState, onGetUser} from '../redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN_COLOR, BACKGROUND_COLOR} from '../utils/Config';

interface HomeScreenProps {
  userReducer: UserState;
  onGetUser: Function;
}

const _HomeScreen: React.FC<HomeScreenProps> = ({userReducer, onGetUser}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
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
    <View style={styles.container} >
      <View style={styles.top_container} >
        <Image
            source={{uri: user.profile_photo}}
            style={styles.top_container_image} />
        <Text style={styles.top_container_title} >"Quotes"</Text>
        <Icon name='card-plus-outline' color="#00344F" size={35} style={styles.top_container_icon} />
      </View>
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
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR
  },
  top_container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5
  },
  top_container_title:{
    fontSize: 30,
    fontFamily: 'bahnschrift',
    marginTop: 10,
    color: "#00344F"
  },
  top_container_image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    margin: 10
  },
  top_container_icon: {
    margin: 10
  },
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
