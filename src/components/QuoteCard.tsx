import React, {useEffect, useState, memo} from 'react';
import {Text, View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {BACKGROUND_COLOR, BASE_URL} from '../utils/Config';
import {
  PostModel,
  UserModel,
  UserState,
  Response,
  onLikePost,
  onDeletePost,
} from '../redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';
import {ApplicationState} from '../redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {StackNavigationProp} from 'react-navigation-stack/lib/typescript/src/vendor/types';
import {RootStackParams} from '../../App';
import {useNavigation} from '@react-navigation/native';
import {showToast} from '../utils/showToast';

interface QuoteCardProps {
  userReducer: UserState;
  post: PostModel;
  onTap: Function;
  userId: number;
  isImage: string;
  onLikePost: Function;
  onDeletePost: Function;
}

const _QuoteCard: React.FC<QuoteCardProps> = ({
  userReducer,
  post,
  userId,
  isImage,
  onLikePost,
  onDeletePost,
}) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParams>>();
  const date = moment(post.created_at).fromNow();
  const [postUser, setPostUser] = useState<UserModel>();
  const [checkIfProfileUser, setCheckIfProfileUser] = useState(false);
  const [deletePost, setDeletePost] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false);
  const [likeTapped, setLikeTapped] = useState(false);
  const {user} = userReducer;

  const getUser = async () => {
    if (userId == user.id) {
      setCheckIfProfileUser(true);
      setPostUser(user);
    } else {
      await axios
        .get<Response & UserModel>(`${BASE_URL}users/${userId}`)
        .then(response => {
          if (response.data.response) {
            setPostUser(response.data.response);
          }
        });
    }
  };

  const onTapComment = (post_id: number) => {
    navigation.navigate('CommentsPage', {post_id});
  };

  const onTapLike = () => {
    onLikePost(post.id, user.id);
    setLikeTapped(!likeTapped)
  };

  const onTapProfilePhoto = (user_id: number) => {
    if (user_id == user.id) {
      navigation.navigate('ProfileScreenStack');
    } else {
      navigation.navigate('UserDetailPage', {
        user_id: user_id,
        acc_id: postUser?.account_id,
      });
    }
  };

  const checkPostUser = () => {
    if (postUser?.id == user.id) {
      setDeletePost(true);
    }
  };

  const onTapDeletePost = async () => {
    setDisableDelete(!disableDelete)
    await onDeletePost(post.id, user.id);
    showToast('Post deleted!');
  };

  useEffect(() => {
    const ac = new AbortController();
    getUser();
    return () => ac.abort();
  }, []);

  useEffect(() => {
    checkPostUser();
  });

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        {checkIfProfileUser ? (
          <>
            <TouchableOpacity onPress={() => onTapProfilePhoto(userId)}>
              <Image source={{uri: user.profile_photo}} style={styles.image} />
            </TouchableOpacity>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.username}> • {date}</Text>
          </>
        ) : (
          <>
            <TouchableOpacity onPress={() => onTapProfilePhoto(userId)}>
              <Image
                source={{uri: postUser?.profile_photo}}
                style={styles.image}
              />
            </TouchableOpacity>
            <Text style={styles.name}>{postUser?.name}</Text>
            <Text style={styles.username}> • {date}</Text>
          </>
        )}
        {deletePost ? (
          <View style={styles.delete_post_container}>
            <TouchableOpacity
              disabled={disableDelete}
              onPress={() => onTapDeletePost()}
              style={styles.delete_post_icon}>
              <Icon name="delete" color="#00344F" size={25} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
      <View style={styles.post_container}>
        <Text style={styles.post_text}>{post.body}</Text>
        <Text style={styles.quote_from}>• {post.post_from}</Text>
      </View>
      {isImage ? (
        <View style={styles.image_container}>
          <Image source={{uri: post.image}} style={styles.post_image} />
        </View>
      ) : null}

      <View style={styles.comment_like_container}>
        <TouchableOpacity onPress={() => onTapComment(post.id)}>
          <View style={styles.comment_like_inside_container}>
            <Icon name="comment-outline" color="#00344F" size={25} />
            <Text style={styles.comment_like_number}>
              {post.total_comments}
            </Text>
          </View>
        </TouchableOpacity>

        <View style={styles.comment_like_inside_container}>
          <TouchableOpacity onPress={() => onTapLike()}>
            {
              likeTapped ? 
              <Icon name="cards-heart" color="#00344F" size={25} />
              :
              <Icon name="cards-heart-outline" color="#00344F" size={25} />
            }
          </TouchableOpacity>
          <Text style={styles.comment_like_number}>{post.total_likes}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: BACKGROUND_COLOR,
    borderColor: 'black',
    borderWidth: 2,
    padding: 5,
    borderRadius: 10,
    flexDirection: 'column',
  },
  top_container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  post_container: {},
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  comment_like_container: {
    flexDirection: 'row',
    marginTop: 2,
  },
  comment_container: {
    flexDirection: 'row',
  },
  comment_like_inside_container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  comment_like_number: {
    fontSize: 15,
    color: 'black',
    margin: 3,
  },
  post_text: {
    color: 'black',
    marginLeft: 55,
    marginRight: 5,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
  },
  quote_from: {
    color: 'black',
    textAlign: 'right',
    marginTop: 10,
    marginRight: 10,
    marginBottom: 5,
    fontWeight: '700',
    fontFamily: 'Roboto-Regular',
  },
  name: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    marginTop: 11,
    color: 'black',
    marginLeft: 5,
  },
  username: {
    fontSize: 15,
    marginTop: 15,
    marginLeft: 5,
    color: 'gray',
    fontFamily: 'Roboto-Regular',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  top_container_icon: {
    margin: 10,
  },
  post_image: {
    width: '90%',
    height: undefined,
    alignItems: 'center',
    borderRadius: 10,
    aspectRatio: 1,
  },
  delete_post_container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  delete_post_icon: {
    marginTop: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  postReducer: state.postReducer,
});

const QuoteCard = connect(mapToStateProps, {onLikePost, onDeletePost})(
  _QuoteCard,
);

export default memo(QuoteCard);
