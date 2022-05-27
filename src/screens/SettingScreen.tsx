import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import {ButtonWithIcon} from '../components';
import {ApplicationState, UserState, onUserSignOut} from '../redux';
import {connect} from 'react-redux';


interface SettingScreenProps {
  userReducer: UserState;
  onUserSignOut: Function;
}

const _SettingScreen: React.FC<SettingScreenProps> = ({onUserSignOut}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

  const goBack = () => {
    navigation.goBack();
  };

  const onTapButton = (txt: string) => {
    console.log(txt);
  };

  const onTapEditProfile = () => {
    navigation.navigate("EditProfilePage")
  }

  const onTapSignOut = async () => {
    await onUserSignOut()
    setTimeout(() => {
      navigation.navigate('LoginStack');
    }, 500);
  };

  
  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <TouchableOpacity onPress={goBack} style={styles.top_container_icon}>
          <Icon name="keyboard-backspace" color="black" size={30} />
        </TouchableOpacity>
        <View style={{flexDirection: 'column'}}>
          <Icon
            name="cog-outline"
            color="black"
            size={130}
            style={{marginTop: 35}}
          />
          <Text style={styles.top_container_title}>"Settings"</Text>
        </View>
      </View>

      <ButtonWithIcon
        btnColor="#7182BD"
        height={60}
        width={350}
        onTap={onTapEditProfile}
        title="Edit Profile"
        txtColor="white"
      />
      <ButtonWithIcon
        btnColor="#7182BD"
        height={60}
        width={350}
        onTap={() => onTapButton('Password changed!')}
        title="Change password"
        txtColor="white"
      />
      <ButtonWithIcon
        btnColor="#7182BD"
        height={60}
        width={350}
        onTap={() => onTapSignOut()}
        title="SIGN OUT"
        txtColor="white"
      />
      <ButtonWithIcon
        btnColor="#9A3833"
        height={60}
        width={350}
        onTap={() => onTapSignOut()}
        title="DELETE ACCOUNT"
        txtColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E4E4E4',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  top_container_title: {
    fontSize: 30,
    fontFamily: 'bahnschrift',
    color: 'black',
    textAlign: 'center',
  },
  top_container_icon: {
    position: 'absolute',
    left: 0,
    top: 15,
    marginLeft: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const SettingScreen = connect(mapToStateProps, {onUserSignOut})(_SettingScreen);

export {SettingScreen};
