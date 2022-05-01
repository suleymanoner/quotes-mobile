import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {ErrorModel,PostModel,UserModel} from '../models';


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

export type PostAction = PostErrorAction | GetUsersPosts | GetPostsAction | GetDailyPostAction | UserGetIndividualPostAction;


export const onGetFeedPosts = (id: string) => {
    return async (dispatch: Dispatch<PostAction>) => {
      try {
  
        const response = await axios.get<PostModel & ErrorModel>(`${BASE_URL}posts/feed/${id}`);

        if (response.data.message) {
          dispatch({
            type: 'ON_POST_ERROR',
            payload: {"message": "Posts not found!"},
          });
        } else {
          dispatch({
            type: 'ON_GET_POSTS',
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: 'ON_POST_ERROR',
          payload: {"message": "Error : " + error},
        });
      }
    };
};


export const onGetIndividualPost = (id: number) => {
    return async (dispatch: Dispatch<PostAction>) => {
      try {
        
        const response = await axios.get<PostModel & ErrorModel>(`${BASE_URL}posts/${id}`);
  
        if (response.data.message) {
          dispatch({
            type: 'ON_POST_ERROR',
            payload: {"message": "Post not found!"},
          });
        } else {
          dispatch({
            type: 'ON_GET_INDV_POST',
            payload: response.data[0],
          });
        }
      } catch (error) {
        dispatch({
          type: 'ON_POST_ERROR',
          payload: {"message": "Error : " + error},
        });
      }
    };
  };


export const onGetDailyPost = () => {
    return async (dispatch: Dispatch<PostAction>) => {
      try {
        
        const response = await axios.get<PostModel & ErrorModel>(`${BASE_URL}dailypost`);

        console.log(response.data)
  
        if (response.data.message) {
          dispatch({
            type: 'ON_POST_ERROR',
            payload: {"message": "Post not found!"},
          });
        } else {
          dispatch({
            type: 'ON_GET_DAILY_POST',
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: 'ON_POST_ERROR',
          payload: {"message": "Error : " + error},
        });
      }
    };
};


export const onGetUsersPosts = (id: string) => {
  return async (dispatch: Dispatch<PostAction>) => {
    try {
      
      const response = await axios.get<PostModel & ErrorModel>(`${BASE_URL}posts/user/${id}`);

      console.log(response.data)

      if (response.data.message) {
        dispatch({
          type: 'ON_POST_ERROR',
          payload: {"message": "Posts not found!"},
        });
      } else {
        dispatch({
          type: 'ON_GET_USERS_POSTS',
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: 'ON_POST_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};