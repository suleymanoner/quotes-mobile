import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, FlatList} from 'react-native';
import {onGetIndividualPost, ApplicationState, UserState, onGetUser, PostState, onGetFeedPosts} from '../redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { MAIN_COLOR, BACKGROUND_COLOR} from '../utils/Config';
import { QuoteCard } from '../components/QuoteCard'

interface HomeScreenProps {
  userReducer: UserState;
  postReducer: PostState;
  onGetUser: Function;
  onGetFeedPosts: Function;
  onGetIndividualPost: Function
}

const _HomeScreen: React.FC<HomeScreenProps> = ({userReducer, postReducer, onGetUser, onGetFeedPosts, onGetIndividualPost}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()
  const {user, error} = userReducer;

  const {feed_posts, indv_post} = postReducer

  const getUser = async () => {
    const id = await AsyncStorage.getItem('user_id')
    onGetUser(id);
  }


  useEffect(() => {
    getUser()
    onGetFeedPosts(6)
    onGetIndividualPost(1)
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

      <FlatList 
        data={feed_posts}
        renderItem={({item}) => <QuoteCard post={item} user={user} onTap={() => {}} />}
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
    color: "#00344F"
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

const HomeScreen = connect(mapToStateProps, {onGetUser, onGetFeedPosts, onGetIndividualPost})(_HomeScreen);

export {HomeScreen};
