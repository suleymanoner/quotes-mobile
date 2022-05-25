import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {ErrorModel,CommentModel} from '../models';


export interface GetCommentsActions {
    readonly type: 'ON_GET_COMMENTS';
    payload: CommentModel;
}

export interface CommentErrorAction {
    readonly type: 'ON_COMMENT_ERROR';
    payload: ErrorModel;
}


export type CommentAndLikeAction = GetCommentsActions | CommentErrorAction;


export const onGetComments = (id: number) => {
    return async (dispatch: Dispatch<CommentAndLikeAction>) => {
      try {
  
        const response = await axios.get<CommentModel & ErrorModel>(`${BASE_URL}postcomments/${id}`);

        if (response.data.message) {
          dispatch({
            type: 'ON_COMMENT_ERROR',
            payload: {"message": "Comment not found!"},
          });
        } else {
          dispatch({
            type: 'ON_GET_COMMENTS',
            payload: response.data,
          });
        }
      } catch (error) {
        dispatch({
          type: 'ON_COMMENT_ERROR',
          payload: {"message": "Error : " + error},
        });
      }
    };
};


// make comment not work. look later.
export const onMakeComment = (comment: string, post_id: number, user_id: number) => {
  return async (dispatch: Dispatch<CommentAndLikeAction>) => {
    try {

      console.log(typeof(post_id))
      console.log(typeof(user_id))

      const p_id = Number(post_id)
      const u_id = Number(user_id)


      const response =  await axios.post(`${BASE_URL}postcomments/make`, {
        "comment": comment,
        "post_id" : post_id,
        "user_id": user_id
      });

      console.log(response.data)


    } catch (error) {
      console.log(error)
      dispatch({
        type: 'ON_COMMENT_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};


export const onLikePost = (post_id: number, user_id: number) => {
  return async (dispatch: Dispatch<CommentAndLikeAction>) => {
    try {

      await axios.post(`${BASE_URL}post/like`, {
        post_id,
        user_id
      });

    } catch (error) {
      console.log(error)
      dispatch({
        type: 'ON_COMMENT_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};
