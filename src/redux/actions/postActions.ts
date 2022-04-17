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
    payload: ErrorModel;
}

export interface PostErrorAction {
    readonly type: 'ON_POST_ERROR';
    payload: ErrorModel;
}

export type PostAction = PostErrorAction | GetPostsAction | UserGetIndividualPostAction;


export const onGetFeedPosts = (id: string) => {
    return async (dispatch: Dispatch<PostAction>) => {
      try {
  
        const response = await axios.get<PostModel & ErrorModel>(`${BASE_URL}posts/feed/${id}`);

        if (response.data.message) {
          dispatch({
            type: 'ON_POST_ERROR',
            payload: {"message": "User not found!"},
          });
        } else {
          dispatch({
            type: 'ON_GET_POSTS',
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



export const onGetIndividualPost = (id: string) => {
    return async (dispatch: Dispatch<PostAction>) => {
      try {
        
        const response = await axios.get<PostModel & ErrorModel>(`${BASE_URL}posts/${id}`);
  
        if (response.data.message) {
          dispatch({
            type: 'ON_POST_ERROR',
            payload: {"message": "User not found!"},
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