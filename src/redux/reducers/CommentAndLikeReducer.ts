import {CommentAndLikeAction} from '../actions';
import {CommentAndLikeState, CommentModel, ErrorModel} from '../models';

const initialState: CommentAndLikeState = {
  comments: {} as [CommentModel],
  commentError: {} as ErrorModel
};


const CommentAndLikeReducer = (state: CommentAndLikeState = initialState, action: CommentAndLikeAction) => {
  switch (action.type) {
    
    case 'ON_GET_COMMENTS':
      return {
        ...state,
        comments: action.payload
      }

    case 'ON_COMMENT_ERROR':
      return {
        ...state,
        commentError: action.payload
      }

    default:
      return state;
  }
}; 

export {CommentAndLikeReducer};
