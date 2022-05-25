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

      const response = await axios.post<Response & UserModel>(`${BASE_URL}users/login`, {
          email,
          password,
        }
      )

      if(response.data.status == 'error') {
        showMessage({
          message: response.data.response,
          description: 'Try again!',
          type: 'danger',
        });
      } else {

        await AsyncStorage.setItem('user_status', response.data.response.status);
        await AsyncStorage.setItem('user_id', JSON.stringify(response.data.response.id));
        await AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.account_id));

        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data.response,
        });
      }
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

      const response = await axios.post<Response & UserModel>(`${BASE_URL}users/register`, {
          name,
          surname,
          email,
          password,
          username,
        }
      );

      console.log(response.data.response)

      if (response.data.status == "error") {
        console.log("signup error : " + response.data.response)
        showMessage({
          message: response.data.response,
          description: 'Try again!',
          type: 'danger',
        });
      } else {
        await AsyncStorage.setItem('user_status', response.data.response.status);
        await AsyncStorage.setItem('user_id', JSON.stringify(response.data.response.id));
        await AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.account_id));

        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data.response,
        });
      }
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

      const response = await axios.get<Response & UserModel>(`${BASE_URL}users/${id}`);

      if (response.data.status == "error") {
        showMessage({
          message: response.data.response,
          description: 'Try again!',
          type: 'danger',
        });
      } else {
        await AsyncStorage.setItem('user_status', response.data.response.status);
        await AsyncStorage.setItem('user_id', JSON.stringify(response.data.response.id));
        await AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.account_id));

        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data.response,
        });
      }
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

      const response = await axios.get<Response & AccountModel>(`${BASE_URL}accounts/${id}`);

      if (response.data.status == "error") {
        showMessage({
          message: response.data.response,
          description: 'Try again!',
          type: 'danger',
        });
      } else {
        await AsyncStorage.setItem('account_id', JSON.stringify(response.data.response.id));
        dispatch({
          type: 'ON_GET_USER_ACCOUNT',
          payload: response.data.response,
        });
      }
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

      const response = await axios.get<Response & UserModel>(`${BASE_URL}userfollowers/followers/${id}`);

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

      const response = await axios.get<Response & UserModel>(`${BASE_URL}userfollowers/followings/${id}`);

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
     
      await AsyncStorage.setItem('user_status', '');
      await AsyncStorage.setItem('user_id', '');
      await AsyncStorage.setItem('account_id', '');

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