import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, Alert, Image } from 'react-native';
import {connect} from 'react-redux';
import {MAIN_COLOR} from '../utils/Config';
import {TextField, ButtonWithIcon} from '../components';
import { UserModel, UserState, ApplicationState, onUserLogin, onUserSignUp, ErrorModel } from '../redux';
import FlashMessage from 'react-native-flash-message';
import {showMessage, hideMessage} from 'react-native-flash-message';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';

interface LoginScreenProps {
  userReducer: UserState;
  onUserLogin: Function;
  onUserSignUp: Function;
}

const _LoginScreen: React.FC<LoginScreenProps> = ({ userReducer, onUserLogin, onUserSignUp }) => {
  
  const {user, error} = userReducer;
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [username, setUsername] = useState('');

  
  const getStatus = async () => {
    try {
      const status = await AsyncStorage.getItem('user_status')
      if(status === "ACTIVE") {
        setTimeout(() => {
          navigation.navigate('BottomTabStack')
        }, 1000);
      }
    } catch (error) {
      console.log(error);
    }
  }


  const showError = (errorMsg?: string) => {
    if(error.message) {
      showMessage({
        message: error.message,
        description: 'Try again!',
        type: 'danger',
      });
    } else if(errorMsg) {
      showMessage({
        message: errorMsg!!,
        description: 'Try again!',
        type: 'danger',
      });
    }
  }

  useEffect(() => {
    getStatus()

    if(user.id !== undefined) {
      if(user.status == "ACTIVE") {
          navigation.navigate('BottomTabStack')
      } else {
        //navigate("ConfirmationPage")
        console.log("navigate confirm page ! ! ! ");
      }
    } else {
      showError()
    }
  }, [user,error]);

 
  const onSignUp = async () => {
    if (email.length == 0 || password.length == 0 || name.length == 0 || surname.length == 0 || username.length == 0) {
      showError('Please fill all blanks!')
    } else {
      if (password == passwordAgain) {
        await onUserSignUp(name, surname, email, password, username);
      } else {
        showError('Your passwords not matched!')
      }
    }
  }
  

  const onLogin = async () => {
    if (email.length == 0 || password.length == 0) {
      showError('Please fill all blanks!')
    } else {
      await onUserLogin(email, password) 
    }
  }


  const onTapGoNextScreen = (where: string) => {
    if (where == 'signup') {
      setIsSignUp(true);
    } else {
      setIsSignUp(false);
    }
  };

  if (!isSignUp) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            source={require('../assets/images/quotes-logo.png')}
            style={styles.image}
          />
          <Text style={styles.title}>"Quotes"</Text>
        </View>

        <View style={styles.input_container}>
          <TextField placeholder="email" onTextChange={setEmail} />
          <TextField
            placeholder="password"
            onTextChange={setPassword}
            isSecure={true}
          />
          <ButtonWithIcon
            onTap={onLogin}
            title="Sign In"
            width={350}
            height={50}
            iconName="login"
            iconColor='white'
            iconSize={30}
          />

          <TouchableOpacity onPress={() => onTapGoNextScreen('signup')}>
            <Text style={styles.link_text}>
              You don't have account yet? Click for Sign-up.
            </Text>
          </TouchableOpacity>
        </View>
        <FlashMessage position="top" />
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>"Sign Up"</Text>

        <TextField placeholder="Name" onTextChange={setName} />
        <TextField placeholder="Surname" onTextChange={setSurname} />
        <TextField placeholder="Email" onTextChange={setEmail} />
        <TextField placeholder="Username" onTextChange={setUsername} />
        <TextField
          placeholder="Password"
          onTextChange={setPassword}
          isSecure={true}
        />
        <TextField
          placeholder="Password Again"
          onTextChange={setPasswordAgain}
          isSecure={true}
        />

        <ButtonWithIcon
          onTap={onSignUp}
          title="Sign Up"
          width={350}
          height={50}
          iconName="account-plus"
          iconColor='white'
          iconSize={30}
        />

        <TouchableOpacity onPress={() => onTapGoNextScreen('signin')}>
          <Text style={styles.link_text}>
            Do you have account? Click for Sign-in.
          </Text>
        </TouchableOpacity>
        <FlashMessage position="top" />
      </View>
    );
  }
};

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const LoginScreen = connect(mapStateToProps, {onUserLogin, onUserSignUp})(_LoginScreen);

export {LoginScreen};

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
    fontFamily: 'bahnschrift',
    color: 'black',
    textAlign: 'center',
  },
  link_text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'black',
  },
});
