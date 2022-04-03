import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {UserModel, ApplicationState, UserState, onGetUser} from '../redux';
import {MAIN_COLOR, BASE_URL, BUTTON_COLOR} from '../utils/Config';
import * as Progress from 'react-native-progress';
import {connect} from 'react-redux';
import {useNavigation} from '../utils/useNavigation';

interface ConfirmationScreenProps {
  navigation: {getParam: Function};
  userReducer: UserState;
  onGetUser: Function;
}

const _ConfirmationScreen: React.FC<ConfirmationScreenProps> = ({
  userReducer,
  onGetUser,
}) => {
  const {navigate} = useNavigation();

  const {user} = userReducer;

  const checkActive = () => {
    onGetUser(user.id);

    if (user.status == 'ACTIVE') {
      navigate('HomePage');
    } else {
      console.log('not active!!!');
    }
  };

  useEffect(() => {
    checkActive();
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title2}>"Please confirm your account"</Text>

      <View style={{alignItems: 'center'}}>
        <Progress.Circle size={50} indeterminate={true} color={BUTTON_COLOR} />
      </View>

      <TouchableOpacity onPress={() => {}}>
        <Text style={styles.link_text}>Go back</Text>
      </TouchableOpacity>
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
  body: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input_container: {
    flex: 8,
  },
  image: {
    width: 150,
    height: 150,
  },
  title: {
    fontSize: 45,
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'Aleo-Regular',
    color: 'black',
    textAlign: 'center',
  },
  title2: {
    fontSize: 30,
    marginBottom: 15,
    marginTop: 15,
    fontFamily: 'Aleo-Regular',
    color: 'black',
    textAlign: 'center',
  },
  link_text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
});
