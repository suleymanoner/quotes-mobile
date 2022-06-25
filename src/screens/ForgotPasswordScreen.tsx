import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView} from 'react-native';
import {ButtonWithIcon, TextField} from '../components';
import {
  UserState,
  onForgotPassword,
  ApplicationState,
  Response,
} from '../redux';
import {BASE_URL, MAIN_COLOR} from '../utils/Config';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import {connect} from 'react-redux';
import axios from 'axios';
import {showToast} from '../utils/showToast';

interface ForgotPasswordScreenProps {
  userReducer: UserState;
  onForgotPassword: Function;
}

const _ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({
  onForgotPassword,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const [forgotEmail, setForgotEmail] = useState('');
  const [isForgotSent, setIsForgotSent] = useState(false);
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordAgain, setNewPasswordAgain] = useState('');

  const resetPassword = async (token: string, password: string) => {
    try {
      await axios
        .post<Response>(`${BASE_URL}users/reset`, {
          token,
          password,
        })
        .then(response => {
          console.log(response.data.response);
          if (response.data.response == 'Your password has been changed!') {
            navigation.navigate('LoginPage');
          }
          showToast(response.data.response);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  const onSendForgotLink = async () => {
    await onForgotPassword(forgotEmail);
  };

  const onResetPassword = () => {
    if (token.length == 0 || newPassword.length == 0) {
      showToast('Please fill all blanks!');
    } else if (newPassword !== newPasswordAgain) {
      showToast('Your passwords not matched!');
    } else {
      resetPassword(token, newPassword);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Image
          source={require('../assets/images/quotes-white-logo.png')}
          style={styles.image}
        />
        <Text style={styles.title}>"Quotes"</Text>
      </View>

      {isForgotSent ? (
        <View style={styles.input_container}>
          <ScrollView>
            <TextField
              placeholder="token"
              onTextChange={setToken}
              value={token}
            />
            <TextField
              placeholder="new password"
              onTextChange={setNewPassword}
              isSecure={true}
              value={newPassword}
            />
            <TextField
              placeholder="new password again"
              onTextChange={setNewPasswordAgain}
              isSecure={true}
              value={newPasswordAgain}
            />
            <ButtonWithIcon
              onTap={onResetPassword}
              title="Reset Password"
              width={350}
              height={50}
              iconName="lock-reset"
              iconColor={MAIN_COLOR}
              iconSize={30}
              btnColor="white"
              txtColor={MAIN_COLOR}
            />
            <TouchableOpacity
              onPress={() => setIsForgotSent(false)}
              style={{marginTop: 5}}>
              <Text style={styles.link_text}>
                Do you want to send recovery link? Click here.
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      ) : (
        <View style={styles.input_container}>
          <ScrollView>
            <TextField
              placeholder="email"
              onTextChange={setForgotEmail}
              value={forgotEmail}
            />
            <ButtonWithIcon
              onTap={onSendForgotLink}
              title="Send Forgot Password Link"
              width={350}
              height={50}
              iconName="send"
              iconColor={MAIN_COLOR}
              iconSize={30}
              btnColor="white"
              txtColor={MAIN_COLOR}
            />
            <TouchableOpacity onPress={() => setIsForgotSent(true)}>
              <Text style={styles.link_text}>Enter token here.</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginTop: 5}}>
              <Text style={styles.link_text}>
                Do you want to go Sign-in? Click here.
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

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

const mapStateToProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const ForgotPasswordScreen = connect(mapStateToProps, {onForgotPassword})(
  _ForgotPasswordScreen,
);

export {ForgotPasswordScreen};
