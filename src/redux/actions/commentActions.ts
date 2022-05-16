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


export type CommentAction = GetCommentsActions | CommentErrorAction;


export const onGetComments = (id: number) => {
    return async (dispatch: Dispatch<CommentAction>) => {
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


export const onMakeComment = (comment: string, post_id: number, user_id: number) => {
  return async (dispatch: Dispatch<CommentAction>) => {
    try {

      const comment_info = {
        "comment" : comment,
        "post_id" : post_id,
        "user_id" : user_id
      }

      const response = await axios.post(`${BASE_URL}postcomments/make`, {
        comment,
        post_id,
        user_id
      });

      console.log(response.data);



   
    } catch (error) {
      console.log(error)
      dispatch({
        type: 'ON_COMMENT_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};
