import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {AccountModel, ErrorModel,UserModel, Response} from '../models';
import AsyncStorage from '@react-native-community/async-storage';
import { showMessage } from 'react-native-flash-message';

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: UserModel;
}

export interface GetUserAccountAction {
  readonly type: 'ON_GET_USER_ACCOUNT';
  payload: AccountModel;
}

export interface GetUserFollowersAndFollowings {
  readonly type: 'ON_GET_USER_FOLLOW';
  payload: UserModel;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: ErrorModel;
}


export type UserAction = UserLoginAction | UserErrorAction | GetUserFollowersAndFollowings | GetUserAccountAction;

export const onUserLogin = (email: string, password: string) => {

  return async (dispatch: Dispatch<UserAction>) => {

    try {

      await axios.post<Response & UserModel>(`${BASE_URL}users/login`, {
          email,
          password,
        }
      ).then(response => {
        if(response.data.status == 'error') {
          showMessage({
            message: response.data.response,
            description: 'Try again!',
            type: 'danger',
          });
        } else {
          AsyncStorage.setItem('user_status', response.data.response.status);
          AsyncStorage.setItem('user_id', JSON.stringify(response.data.response.id));
          AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.account_id));
  
          dispatch({
            type: 'ON_USER_LOGIN',
            payload: response.data.response,
          });
        }
      }).catch(err => console.log(err));

    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};

export const onUserSignUp = (name: string, surname: string, email: string, password: string, username: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      console.log('before signup');

      await axios.post<Response & UserModel>(`${BASE_URL}users/register`, {
          name,
          surname,
          email,
          password,
          username,
        }
      ).then(response => {
        if (response.data.status == "error") {
          console.log("signup error : " + response.data.response)
          showMessage({
            message: response.data.response,
            description: 'Try again!',
            type: 'danger',
          });
        } else {
          AsyncStorage.setItem('user_status', response.data.response.status);
          AsyncStorage.setItem('user_id', JSON.stringify(response.data.response.id));
          AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.account_id));
  
          dispatch({
            type: 'ON_USER_LOGIN',
            payload: response.data.response,
          });
        }
      }).catch(err => console.log(err));

    } catch (error) {
      showMessage({
        message: "Error : " + error,
        description: 'Try again!',
        type: 'danger',
      });
    }
  };
};

export const onGetUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      await axios.get<Response & UserModel>(`${BASE_URL}users/${id}`)
      .then(response => {
        if (response.data.status == "error") {
          showMessage({
            message: response.data.response,
            description: 'Try again!',
            type: 'danger',
          });
        } else {
          AsyncStorage.setItem('user_status', response.data.response.status);
          AsyncStorage.setItem('user_id', JSON.stringify(response.data.response.id));
          AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.account_id));
  
          dispatch({
            type: 'ON_USER_LOGIN',
            payload: response.data.response,
          });
        }
      }).catch(err => console.log(err));

    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};


export const onGetUserAccount = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      await axios.get<Response & AccountModel>(`${BASE_URL}accounts/${id}`)
      .then(response => {
        if (response.data.status == "error") {
          showMessage({
            message: response.data.response,
            description: 'Try again!',
            type: 'danger',
          });
        } else {
          AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.id));
          dispatch({
            type: 'ON_GET_USER_ACCOUNT',
            payload: response.data.response,
          });
        }
      }).catch(err => console.log(err));

    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};

export const onGetUserFollowers = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      await axios.get<Response & UserModel>(`${BASE_URL}userfollowers/followers/${id}`)
      .then(response => {
        if (response.data.status == "error") {
          showMessage({
            message: response.data.response,
            description: 'Try again!',
            type: 'danger',
          });
        } else {
          dispatch({
            type: 'ON_GET_USER_FOLLOW',
            payload: response.data.response[0],
          });
        }
      }).catch(err => console.log(err));

    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};


export const onGetUserFollowings = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      await axios.get<Response & UserModel>(`${BASE_URL}userfollowers/followings/${id}`)
      .then(response => {
        if (response.data.status == "error") {
          showMessage({
            message: response.data.response,
            description: 'Try again!',
            type: 'danger',
          });
        } else {
          dispatch({
            type: 'ON_GET_USER_FOLLOW',
            payload: response.data.response[0],
          });
        }
      }).catch(err => console.log(err));

    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};

export const onUserSignOut = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await AsyncStorage.setItem('user_status', '').catch(err => console.log(err));
      await AsyncStorage.setItem('user_id', '').catch(err => console.log(err));
      await AsyncStorage.setItem('account_id', '').catch(err => console.log(err));

      dispatch({
        type: 'ON_USER_LOGIN',
        payload: {} as UserModel,
      });
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};

export const onUserFollow = (follower_id: number, user_id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      await axios.post(`${BASE_URL}userfollowers/follow`, {
        follower_id,
        user_id
      }).catch(err => console.log(err));

    } catch (error) {
      console.log(error)
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};

export const onUserUnfollow = (follower_id: number, user_id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      await axios.post(`${BASE_URL}userfollowers/unfollow`, {
        follower_id,
        user_id
      }).catch(err => console.log(err));

    } catch (error) {
      console.log(error)
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {"message": "Error : " + error},
      });
    }
  };
};