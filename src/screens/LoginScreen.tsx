import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import {connect} from 'react-redux';
import {BASE_URL, MAIN_COLOR} from '../utils/Config';
import {TextField, ButtonWithIcon} from '../components';
import {
  UserModel,
  UserState,
  ApplicationState,
  onUserLogin,
  onUserSignUp,
  Response,
} from '../redux';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import axios from 'axios';
import {showToast} from '../utils/showToast';

interface LoginScreenProps {
  userReducer: UserState;
  onUserLogin: Function;
  onUserSignUp: Function;
}

const _LoginScreen: React.FC<LoginScreenProps> = ({
  userReducer,
  onUserLogin,
  onUserSignUp,
}) => {
  const {user, error} = userReducer;
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [username, setUsername] = useState('');
  const [storageUser, setStorageUser] = useState<UserModel>();

  const getUserFromStorage = async () => {
    try {
      const id = await AsyncStorage.getItem('user_id');

      if (id !== null) {
        if (id) {
          await axios
            .get<Response & UserModel>(`${BASE_URL}users/${id}`)
            .then(response => {
              if (response.data.response) {
                setStorageUser(response.data.response);
              }
            })
            .catch(err => console.log(err));
        }
      } else {
        storageUser?.id == null
      }
    } catch (error) {
      console.log(error);
    }
  };

  const showError = (errorMsg?: string) => {
    if (error.message) {
      showToast(error.message);
    } else if (errorMsg) {
      showToast(errorMsg);
    }
  };

  useEffect(() => {
    const ac = new AbortController();
    getUserFromStorage();
    return () => ac.abort();
  });

  useEffect(() => {
    const ac = new AbortController();
    if (storageUser?.id !== undefined) {
      if (storageUser.status == 'ACTIVE') {
        navigation.navigate('BottomTabStack');
      } else {
        navigation.navigate('ConfirmationPage');
      }
    }
    return () => ac.abort();
  }, [storageUser]);

  const onSignUp = async () => {
    if (
      email.length == 0 ||
      password.length == 0 ||
      name.length == 0 ||
      surname.length == 0 ||
      username.length == 0
    ) {
      showError('Please fill all blanks!');
    } else {
      if (password == passwordAgain) {
        await onUserSignUp(name, surname, email, password, username);
      } else {
        showError('Your passwords not matched!');
      }
    }
  };

  const onLogin = async () => {
    if (email.length == 0 || password.length == 0) {
      showError('Please fill all blanks!');
    } else {
      await onUserLogin(email, password);
    }
  };

  const onTapForgotPassword = () => {
    navigation.navigate('ForgotPasswordPage');
  };

  const onTapGoNextScreen = (where: string) => {
    if (where == 'signup') {
      setIsSignUp(true);
    } else if (where == 'signin') {
      setIsSignUp(false);
    }
  };

  if (!isSignUp) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            source={require('../assets/images/quotes-white-logo.png')}
            style={styles.image}
          />
          <Text style={styles.title}>"Quotes"</Text>
        </View>
        <View style={styles.input_container}>
          <ScrollView>
            <TextField
              placeholder="email"
              onTextChange={setEmail}
              value={email}
            />
            <TextField
              placeholder="password"
              onTextChange={setPassword}
              isSecure={true}
              value={password}
            />
            <ButtonWithIcon
              onTap={onLogin}
              title="Sign In"
              width={350}
              height={50}
              iconName="login"
              iconColor={MAIN_COLOR}
              iconSize={30}
              btnColor="white"
              txtColor={MAIN_COLOR}
            />
            <TouchableOpacity onPress={() => onTapForgotPassword()}>
              <Text style={[styles.link_text, {marginTop: 5}]}>
                Forgot password?
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onTapGoNextScreen('signup')}>
              <Text style={styles.link_text}>
                You don't have account yet? Click for Sign-up.
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>"Sign Up"</Text>
        <ScrollView>
          <TextField placeholder="Name" onTextChange={setName} value={name} />
          <TextField
            placeholder="Surname"
            onTextChange={setSurname}
            value={surname}
          />
          <TextField
            placeholder="Email"
            onTextChange={setEmail}
            value={email}
          />
          <TextField
            placeholder="Username"
            onTextChange={setUsername}
            value={username}
          />
          <TextField
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
            value={password}
          />
          <TextField
            placeholder="Password Again"
            onTextChange={setPasswordAgain}
            isSecure={true}
            value={passwordAgain}
          />
          <ButtonWithIcon
            onTap={onSignUp}
            title="Sign Up"
            width={350}
            height={50}
            iconName="account-plus"
            iconColor={MAIN_COLOR}
            iconSize={30}
            btnColor="white"
            txtColor={MAIN_COLOR}
          />
          <TouchableOpacity onPress={() => onTapGoNextScreen('signin')}>
            <Text style={styles.link_text}>
              Do you have account? Click for Sign-in.
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
};

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const LoginScreen = connect(mapStateToProps, {onUserLogin, onUserSignUp})(
  _LoginScreen,
);

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
    color: 'white',
    textAlign: 'center',
  },
  link_text: {
    textAlign: 'center',
    fontSize: 15,
    color: 'white',
  },
});
