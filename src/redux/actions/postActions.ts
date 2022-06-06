import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {ErrorModel, PostModel} from '../models';
import {showToast} from '../../utils/showToast';

export interface UserGetIndividualPostAction {
  readonly type: 'ON_GET_INDV_POST';
  payload: PostModel;
}

export interface GetPostsAction {
  readonly type: 'ON_GET_POSTS';
  payload: PostModel;
}

export interface GetUsersPosts {
  readonly type: 'ON_GET_USERS_POSTS';
  payload: PostModel;
}

export interface GetDailyPostAction {
  readonly type: 'ON_GET_DAILY_POST';
  payload: PostModel;
}

export interface PostErrorAction {
  readonly type: 'ON_POST_ERROR';
  payload: ErrorModel;
}

export type PostAction =
  | PostErrorAction
  | GetUsersPosts
  | GetPostsAction
  | GetDailyPostAction
  | UserGetIndividualPostAction;

export const onGetFeedPosts = (id: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await axios
        .get<PostModel & ErrorModel>(`${BASE_URL}posts/feed/${id}`)
        .then(response => {
          if (response.data.message) {
            showToast('Posts not found!');
          } else {
            dispatch({
              type: 'ON_GET_POSTS',
              payload: response.data,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetIndividualPost = (id: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await axios
        .get<PostModel & ErrorModel>(`${BASE_URL}posts/${id}`)
        .then(response => {
          if (response.data.message) {
            showToast('Post not found!');
          } else {
            dispatch({
              type: 'ON_GET_INDV_POST',
              payload: response.data[0],
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetDailyPost = () => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await axios
        .get<PostModel & ErrorModel>(`${BASE_URL}dailypost`)
        .then(response => {
          if (response.data.message) {
            showToast('Post not found!');
          } else {
            dispatch({
              type: 'ON_GET_DAILY_POST',
              payload: response.data,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetUsersPosts = (id: string) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await axios
        .get<PostModel & ErrorModel>(`${BASE_URL}posts/user/${id}`)
        .then(response => {
          if (response.data.message) {
            showToast('Posts not found!');
          } else {
            dispatch({
              type: 'ON_GET_USERS_POSTS',
              payload: response.data,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onPostQuote = (
  body: string,
  post_from: string,
  image: string | null,
  user_id: number,
) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await axios
        .post(`${BASE_URL}posts`, {
          body,
          post_from,
          image,
          user_id,
        })
        .then(response => {
          console.log(response.data);
          onGetFeedPosts(user_id);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onDeletePost = (id: number, user_id: number) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      await axios
        .delete(`${BASE_URL}posts/${id}`, {})
        .then(response => {
          console.log(response.data);
          onGetFeedPosts(user_id);
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};
