import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import { useNavigation } from '@react-navigation/native';
import { BACKGROUND_COLOR, BASE_URL, TEXT_COLOR } from '../utils/Config'
import {ApplicationState, UserState, UserModel, Response} from '../redux';
import {connect} from 'react-redux';
import UserCard from '../components/UserCard';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';


interface FollowerListScreenProps {
    userReducer: UserState;
    route: any
}

const _FollowerListScreen: React.FC<FollowerListScreenProps> = ({route, userReducer}) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { user } = userReducer

    const { title, user_id } = route.params

    const [userFollowers, setUserFollowers] = useState<[UserModel]>()
    const [userFollowings, setUserFollowings] = useState<[UserModel]>()

    const getFollowers = async (id: number) => {
      try {
        await axios.get<Response & UserModel>(`${BASE_URL}userfollowers/followers/${id}`)
        .then(response => {
          if (response.data.response) {
            setUserFollowers(response.data.response)
          }
        }).catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }

    const getFollowings = async (id: number) => {
      try {
        await axios.get<Response & UserModel>(`${BASE_URL}userfollowers/followings/${id}`)
        .then(response => {
          if (response.data.response) {
            setUserFollowings(response.data.response)
          }
        }).catch(err => console.log(err));
      } catch (error) {
        console.log(error);
      }
    }

    const onGoUserDetail:Function = (id: number, acc_id: number) => {
      navigation.navigate('UserDetailPage', {"user_id": id, "acc_id": acc_id})
    }

    useEffect(() => {
      const ac = new AbortController();
      getFollowers(user_id)
      getFollowings(user_id)
      return () => ac.abort()
    }, [])
    
    const goBack = () => {
      navigation.goBack();
    };

  return (
    <View style={styles.container}>
    <View style={styles.top_container}>
      <TouchableOpacity onPress={goBack} style={styles.top_container_icon}>
          <Icon name="keyboard-backspace" color="black" size={30} />
      </TouchableOpacity>
      <Text style={styles.top_container_title}>"{title}"</Text>
    </View>

    <View style={styles.user_list_container}>
      {
        title == "Followers" ? 
        <FlatList 
        data={userFollowers}
        initialNumToRender={3}
        renderItem={({item}) => <UserCard image={item.profile_photo!} name={item.name}
        onTap={() => onGoUserDetail(item.id, item.account_id)} />}
        keyExtractor={(item, index) => String(index)}
        /> :
        <FlatList 
        data={userFollowings}
        initialNumToRender={3}
        renderItem={({item}) => <UserCard image={item.profile_photo!} name={item.name}
        onTap={() => onGoUserDetail(item.id, item.account_id)}/>}
        keyExtractor={(item, index) => String(index)}
        />
      }
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: BACKGROUND_COLOR,
    },
    top_container: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    top_container_title: {
      fontSize: 30,
      fontFamily: 'bahnschrift',
      marginTop: 10,
      color: TEXT_COLOR,
    },
    user_list_container: {
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      margin: 10
    },
    textField: {
      width: 320,
      height: 50,
      fontSize: 16,
      color: TEXT_COLOR,
      fontFamily: 'Roboto-Regular',
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

const FollowerListScreen = connect(mapToStateProps, {})(_FollowerListScreen);


export {FollowerListScreen}