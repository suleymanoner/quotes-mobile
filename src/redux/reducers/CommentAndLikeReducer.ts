import {CommentAction} from '../actions';
import {CommentAndLikeState, CommentModel} from '../models';

const initialState: CommentAndLikeState = {
  comments: {} as [CommentModel],
};


const CommentAndLikeReducer = (state: CommentAndLikeState = initialState, action: CommentAction) => {
  switch (action.type) {
    
    case 'ON_GET_COMMENTS':
      return {
        ...state,
        comments: action.payload
      }

    default:
      return state;
  }
}; 

export {CommentAndLikeReducer};
