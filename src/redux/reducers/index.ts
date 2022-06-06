import {combineReducers} from 'redux';
import {UserReducer} from './userReducer';
import {PostReducer} from './postReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  postReducer: PostReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export {rootReducer};
