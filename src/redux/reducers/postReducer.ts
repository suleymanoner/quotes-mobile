import {PostAction} from '../actions';
import {AccountModel, UserModel, PostState, ErrorModel, PostModel} from '../models';

const initialState: PostState = {
  users_posts: {} as [PostModel],
  feed_posts: {} as [PostModel],
  liked_posts: {} as [PostModel],
  indv_post: {} as PostModel,
  daily_post: {} as PostModel
};


const PostReducer = (state: PostState = initialState, action: PostAction) => {
  switch (action.type) {
    
    case 'ON_GET_POSTS':
      return {
        ...state,
        feed_posts: action.payload
      }
        

    case 'ON_GET_INDV_POST':
      return {
        ...state,
        indv_post: action.payload
      }
        

    case 'ON_GET_DAILY_POST':
      return {
        ...state,
        daily_post: action.payload
      }

    default:
      return state;
  }
}; 

export {PostReducer};
