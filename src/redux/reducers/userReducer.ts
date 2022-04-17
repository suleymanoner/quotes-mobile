import {UserAction} from '../actions';
import {AccountModel, UserModel, UserState, ErrorModel, PostModel} from '../models';

const initialState: UserState = {
  user: {} as UserModel,
  account: {} as AccountModel,
  error: {} as ErrorModel,
  post: {} as PostModel,
  postUser: {} as UserModel
};


const UserReducer = (state: UserState = initialState, action: UserAction) => {
  switch (action.type) {
    case 'ON_USER_LOGIN':
      return {
        ...state,
        user: action.payload,
      };

    case 'ON_GET_USER_ACCOUNT':
      return {
        ...state,
        account: action.payload
      }

    case 'ON_GET_POST_USER':
      return {
        ...state,
        postUser: action.payload
      }

    case 'ON_USER_ERROR':
      return {
        ...state,
        error: action.payload,
      };
    
  
    default:
      return state;
  }
}; 

export {UserReducer};
