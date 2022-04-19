import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {onGetIndividualPost, ApplicationState, UserState, onGetUser, PostState, onGetFeedPosts, onGetPostUser, onGetUserAccount} from '../redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TEXT_COLOR, BACKGROUND_COLOR} from '../utils/Config';
import { QuoteCard } from '../components/QuoteCard'

interface HomeScreenProps {
  userReducer: UserState;
  postReducer: PostState;
  onGetUser: Function;
  onGetFeedPosts: Function;
  onGetIndividualPost: Function;
  onGetPostUser: Function;
  onGetUserAccount: Function
}

const _HomeScreen: React.FC<HomeScreenProps> = ({userReducer, postReducer, onGetUser, onGetFeedPosts, onGetIndividualPost, onGetUserAccount}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const {user, error, account} = userReducer;

  const {feed_posts, indv_post} = postReducer

  const [storageUserId, setStorageUserId] = useState<string|null>()

  const getUser = async () => {
    const id = await AsyncStorage.getItem('user_id')
    setStorageUserId(id)
    const account_id = await AsyncStorage.getItem('account_id')
    onGetUser(id);
    onGetUserAccount(account_id)
  }


  useEffect(() => {
    getUser()
  }, [])

  useEffect(() => {
    onGetFeedPosts(storageUserId)
  }, [storageUserId, feed_posts])


  return (
    <View style={styles.container} >
      <View style={styles.top_container} >
        <Image
            source={{uri: user.profile_photo}}
            style={styles.top_container_image} />
        <Text style={styles.top_container_title} >"Quotes"</Text>
        <Icon name='card-plus-outline' color="#00344F" size={35} style={styles.top_container_icon} />
      </View>

      <FlatList 
        data={feed_posts}
        renderItem={({item}) => <QuoteCard post={item} userId={item.user_id} isImage={item.image} onTap={() => {}} />}
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
  },
  top_container_title:{
    fontSize: 30,
    fontFamily: 'bahnschrift',
    marginTop: 10,
    color: TEXT_COLOR
  },
  top_container_image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    margin: 10,
    borderWidth: 1,
    borderColor: "black"
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
  postReducer: state.postReducer
});

const HomeScreen = connect(mapToStateProps, {onGetUser, onGetFeedPosts, onGetIndividualPost, onGetPostUser, onGetUserAccount})(_HomeScreen);

export {HomeScreen};
