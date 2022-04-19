import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {AccountModel, ErrorModel,PostModel,UserModel} from '../models';
import AsyncStorage from '@react-native-community/async-storage';

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: UserModel;
}

export interface GetUserAccountAction {
  readonly type: 'ON_GET_USER_ACCOUNT';
  payload: AccountModel;
}

export interface GetPostUserAction {
  readonly type: 'ON_GET_POST_USER';
  payload: UserModel;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: ErrorModel;
}


export type UserAction = UserLoginAction | UserErrorAction | GetPostUserAction | GetUserAccountAction;

export const onUserLogin = (email: string, password: string) => {

  return async (dispatch: Dispatch<UserAction>) => {

    try {

      console.log('before login');

      const response = await axios.post<UserModel & ErrorModel>(`${BASE_URL}users/login`, {
          email,
          password,
        }
      )

      console.log("response : " + response.data.message)

      console.log('after login');

        if (response.data.message) {
          console.log('in respns.data.message : ' + response.data.message);
          dispatch({
            type: 'ON_USER_ERROR',
            payload: response.data,
          });
        } else {
          await AsyncStorage.setItem('user_status', response.data.status);
          await AsyncStorage.setItem('user_id', JSON.stringify(response.data.id));
          await AsyncStorage.setItem('account_id', JSON.stringify(response.data.account_id));

          console.log('response data on action but correct: ' + response.data);
          dispatch({
            type: 'ON_USER_LOGIN',
            payload: response.data,
          });
        }
    } catch (error) {
      console.log('ON error on action: ' + error);
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

      const response = await axios.post<UserModel & ErrorModel>(`${BASE_URL}users/register`, {
          name,
          surname,
          email,
          password,
          username,
        }
      );

      console.log('after signup');

      console.log(response.data);

      if (response.data.message) {
        console.log("signup error : " + response.data.message)
        dispatch({
          type: 'ON_USER_ERROR',
          payload: response.data,
        });
      } else {
        await AsyncStorage.setItem('user_status', response.data.status);
        await AsyncStorage.setItem('user_id', JSON.stringify(response.data.id));

        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data,
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

export const onGetUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      const response = await axios.get<UserModel & ErrorModel>(`${BASE_URL}users/${id}`);

      if (response.data.message) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: {"message": "User not found!"},
        });
      } else {
        await AsyncStorage.setItem('user_status', response.data.status);
        await AsyncStorage.setItem('user_id', JSON.stringify(response.data.id));
        await AsyncStorage.setItem('account_id', JSON.stringify(response.data.account_id));

        dispatch({
          type: 'ON_USER_LOGIN',
          payload: response.data,
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

      const response = await axios.get<AccountModel & ErrorModel>(`${BASE_URL}accounts/${id}`);

      if (response.data.message) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: {"message": "User not found!"},
        });
      } else {
        await AsyncStorage.setItem('account_id', JSON.stringify(response.data.id));
        dispatch({
          type: 'ON_GET_USER_ACCOUNT',
          payload: response.data,
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


export const onGetPostUser = (id: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {

      const response = await axios.get<UserModel & ErrorModel>(`${BASE_URL}users/${id}`);

      if (response.data.message) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: {"message": "User not found!"},
        });
      } else {
        dispatch({
          type: 'ON_GET_POST_USER',
          payload: response.data,
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

