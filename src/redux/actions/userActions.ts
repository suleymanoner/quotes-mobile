import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {ErrorModel,UserModel} from '../models';

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: UserModel;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: ErrorModel;
}

export type UserAction = UserLoginAction | UserErrorAction;


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
          //await AsyncStorage.setItem('user_status', response.data.status);
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
      console.log('before get user');

      const response = await axios.get<UserModel & ErrorModel>(`${BASE_URL}users/${id}`);

      console.log('after get user');

      console.log(response.data);

      if (response.data.message) {
        dispatch({
          type: 'ON_USER_ERROR',
          payload: {"message": "User not found!"},
        });
      } else {
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
