import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {UserModel, ApplicationState, UserState} from '../redux';
import {connect} from 'react-redux';

interface HomeScreenProps {
  userReducer: UserState;
  navigation: {getParam: Function};
}

const _HomeScreen: React.FC<HomeScreenProps> = props => {
  //const {getParam} = props.navigation;

  const {user, error} = props.userReducer;

  console.log(user);
  console.log(error);


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

const HomeScreen = connect(mapToStateProps, {})(_HomeScreen);

export {HomeScreen};
