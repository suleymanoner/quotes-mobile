import React, {useEffect, useState, memo} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {UserModel, CommentModel, UserState, onDeleteComment} from '../redux';
import {BACKGROUND_COLOR, BASE_URL} from '../utils/Config';
import moment from 'moment';
import {ApplicationState, Response} from '../redux';
import {connect} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {showToast} from '../utils/showToast';

interface CommentCardProps {
  userReducer: UserState;
  comment: CommentModel;
  userId: number;
  onDeleteComment: Function;
}

const _CommentCard: React.FC<CommentCardProps> = ({
  userReducer,
  comment,
  userId,
  onDeleteComment,
}) => {
  const [deleteIcon, setDeleteIcon] = useState(false);
  const [disableDelete, setDisableDelete] = useState(false)
  const {user} = userReducer;
  const date = moment(comment.created_at).fromNow();
  const [commentUser, setCommentUser] = useState<UserModel>();

  const getUser = async () => {
    if (userId) {
      await axios
        .get<Response & UserModel>(`${BASE_URL}users/${userId}`)
        .then(response => {
          if (response.data.response) {
            setCommentUser(response.data.response);
          }
        });
    }
  };

  const checkCommentUser = () => {
    if (commentUser?.id == user.id) {
      setDeleteIcon(true);
    }
  };

  const deleteComment = async () => {
    setDisableDelete(!disableDelete)
    await onDeleteComment(comment.id);
    showToast('Comment deleted!');
  };

  useEffect(() => {
    const ac = new AbortController();
    getUser();
    return () => ac.abort();
  }, []);

  useEffect(() => {
    const ac = new AbortController();
    checkCommentUser();
    return () => ac.abort();
  }, [commentUser]);

  return (
    <View style={styles.container}>
      <View style={styles.top_container}>
        <Image
          source={{uri: commentUser?.profile_photo}}
          style={styles.image}
        />
        <Text style={styles.name}>{commentUser?.name}</Text>
        <Text style={styles.username}> • {date}</Text>
        {deleteIcon ? (
          <View style={styles.delete_icon_container}>
            <TouchableOpacity
              disabled={disableDelete}
              onPress={() => deleteComment()}
              style={styles.delete_icon}>
              <Icon name="delete" color="#00344F" size={30} />
            </TouchableOpacity>
          </View>
        ) : (
          <></>
        )}
      </View>
      <Text style={styles.comment}>{comment.comment}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  comment: {
    fontFamily: 'Roboto-Regular',
    textAlign: 'left',
    marginLeft: 55,
    color: 'black',
    fontSize: 15,
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 30,
    margin: 5,
    borderWidth: 1,
    borderColor: 'black',
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
  delete_icon_container: {
    flex: 1,
    alignItems: 'flex-end',
  },
  delete_icon: {
    marginTop: 10,
  },
});

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
  postReducer: state.postReducer,
});

const CommentCard = connect(mapToStateProps, {onDeleteComment})(_CommentCard);

export default memo(CommentCard);
