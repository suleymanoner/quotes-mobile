import React, { useEffect, useState } from 'react';
import {View, Text, Image, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {onGetIndividualPost, ApplicationState, UserState, CommentAndLikeState, onGetUser, PostState, onGetFeedPosts, onGetUserAccount} from '../redux';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import { RootStackParams } from '../../App';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TEXT_COLOR, BACKGROUND_COLOR} from '../utils/Config';
import QuoteCard from '../components/QuoteCard'

interface HomeScreenProps {
  userReducer: UserState;
  postReducer: PostState;
  commentAndLikeReducer: CommentAndLikeState;
  onGetUser: Function;
  onGetFeedPosts: Function;
  onGetIndividualPost: Function;
  onGetPostUser: Function;
  onGetUserAccount: Function
}

const _HomeScreen: React.FC<HomeScreenProps> = ({userReducer, postReducer, commentAndLikeReducer, onGetUser, onGetFeedPosts, onGetUserAccount}) => {

  const navigation = useNavigation<StackNavigationProp<RootStackParams>>()

  const {user, account} = userReducer;

  const {feed_posts, indv_post} = postReducer

  const { comments } = commentAndLikeReducer

  const [storageUserId, setStorageUserId] = useState<string|null>()

  const getUser = async () => {

    try {
      const id = await AsyncStorage.getItem('user_id')

      if(id !== undefined) {
        setStorageUserId(id)
        onGetUser(id);
      }
      const account_id = await AsyncStorage.getItem('account_id')
      if(account_id !== undefined) {
        onGetUserAccount(account_id)
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    let unmounted = false

    if(!unmounted) {
      getUser()
    }
    return () => {
        unmounted = true    
    };
  }, [])

  useEffect(() => {
    let unmounted = false

    if(!unmounted) {
      onGetFeedPosts(storageUserId)
    }
    return () => {
        unmounted = true    
    };
  }, [feed_posts, comments])


  const onTapPostIcon = () => {
    navigation.navigate("PostQuotePage", {acc_name : account.name})
  }

  const onTapProfilePhoto = () => {
    navigation.navigate('ProfileScreenStack');
  }
  
  return (
    <View style={styles.container} >
      <View style={styles.top_container} >
      <TouchableOpacity onPress={() => onTapProfilePhoto()}>
        <Image
            source={{uri: user.profile_photo}}
            style={styles.top_container_image} />
        </TouchableOpacity>
        <Text style={styles.top_container_title} >"Quotes"</Text>
        <TouchableOpacity onPress={() => onTapPostIcon()} >
          <Icon name='comment-quote-outline' color="#00344F" size={35} style={styles.top_container_icon} />
        </TouchableOpacity>
      </View>

      <FlatList 
        data={feed_posts}
        initialNumToRender={3}
        renderItem={({item}) => <QuoteCard post={item} userId={item.user_id} isImage={item.image} onTap={() => {}} />}
        keyExtractor={(item, index) => String(index)}
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
  postReducer: state.postReducer,
  commentAndLikeReducer: state.commentAndLikeReducer
});

const HomeScreen = connect(mapToStateProps, {onGetUser, onGetFeedPosts, onGetIndividualPost, onGetUserAccount})(_HomeScreen);

export {HomeScreen};
