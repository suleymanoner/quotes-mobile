import axios from 'axios';
import {Dispatch} from 'react';
import {BASE_URL} from '../../utils/Config';
import {AccountModel, ErrorModel, UserModel, Response} from '../models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showToast} from '../../utils/showToast';

export interface UserLoginAction {
  readonly type: 'ON_USER_LOGIN';
  payload: UserModel;
}

export interface GetUserAccountAction {
  readonly type: 'ON_GET_USER_ACCOUNT';
  payload: AccountModel;
}

export interface GetUserFollowers {
  readonly type: 'ON_GET_USER_FOLLOWERS';
  payload: UserModel;
}

export interface GetAllUsers {
  readonly type: 'ON_GET_ALL_USERS';
  payload: UserModel;
}

export interface GetUserFollowings {
  readonly type: 'ON_GET_USER_FOLLOWINGS';
  payload: UserModel;
}

export interface UserErrorAction {
  readonly type: 'ON_USER_ERROR';
  payload: ErrorModel;
}

export type UserAction =
  | UserLoginAction
  | UserErrorAction
  | GetUserFollowers
  | GetUserFollowings
  | GetUserAccountAction
  | GetAllUsers;

export const onUserLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .post<Response & UserModel>(`${BASE_URL}users/login`, {
          email,
          password,
        })
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            AsyncStorage.setItem('user_status', response.data.response.status);
            AsyncStorage.setItem(
              'user_id',
              JSON.stringify(response.data.response.id),
            );
            AsyncStorage.setItem(
              'account_id',
              JSON.stringify(response.data.response.account_id),
            );

            dispatch({
              type: 'ON_USER_LOGIN',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onUserSignUp = (
  name: string,
  surname: string,
  email: string,
  password: string,
  username: string,
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .post<Response & UserModel>(`${BASE_URL}users/register`, {
          name,
          surname,
          email,
          password,
          username,
        })
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            AsyncStorage.setItem('user_status', response.data.response.status);
            AsyncStorage.setItem(
              'user_id',
              JSON.stringify(response.data.response.id),
            );
            AsyncStorage.setItem(
              'account_id',
              JSON.stringify(response.data.response.account_id),
            );
            dispatch({
              type: 'ON_USER_LOGIN',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      showToast('Error : ' + error);
    }
  };
};

export const onGetUser = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .get<Response & UserModel>(`${BASE_URL}users/${id}`)
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            dispatch({
              type: 'ON_USER_LOGIN',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetUserAccount = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .get<Response & AccountModel>(`${BASE_URL}accounts/${id}`)
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            AsyncStorage.setItem(
              'account_id',
              JSON.stringify(response.data.response.id),
            );
            dispatch({
              type: 'ON_GET_USER_ACCOUNT',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetUserFollowers = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .get<Response & UserModel>(`${BASE_URL}userfollowers/followers/${id}`)
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            dispatch({
              type: 'ON_GET_USER_FOLLOWERS',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetUserFollowings = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .get<Response & UserModel>(`${BASE_URL}userfollowers/followings/${id}`)
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            dispatch({
              type: 'ON_GET_USER_FOLLOWINGS',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onUserSignOut = () => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await AsyncStorage.getAllKeys().then(keys =>
        AsyncStorage.multiRemove(keys),
      );

      await AsyncStorage.removeItem('user_status');
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('account_id');
      dispatch({
        type: 'ON_USER_LOGIN',
        payload: {} as UserModel,
      });
      dispatch({
        type: 'ON_GET_USER_ACCOUNT',
        payload: {} as AccountModel,
      });
      dispatch({
        type: 'ON_GET_USER_FOLLOWERS',
        payload: {} as UserModel,
      });
      dispatch({
        type: 'ON_GET_USER_FOLLOWINGS',
        payload: {} as UserModel,
      });
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onUserDeleteAccount = (account_id: number, user_id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      onUserSignOut();
      await axios
        .post<Response>(`${BASE_URL}users/deleteAccount`, {
          account_id,
          user_id,
        })
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            showToast(response.data.response);
          }
        })
        .catch(err => console.log(err.response.data));
    } catch (error) {
      showToast('Error : ' + error);
      console.log(error);
    }
  };
};

export const onUserFollow = (follower_id: number, user_id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .post(`${BASE_URL}userfollowers/follow`, {
          follower_id,
          user_id,
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onUserUnfollow = (follower_id: number, user_id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .post(`${BASE_URL}userfollowers/unfollow`, {
          follower_id,
          user_id,
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onUserEditProfile = (
  id: number,
  name: string,
  surname: string,
  bio: string,
  profile_photo: string,
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .put<Response & UserModel>(`${BASE_URL}users/${id}`, {
          name,
          surname,
          bio,
          profile_photo,
        })
        .then(response => {
          dispatch({
            type: 'ON_USER_LOGIN',
            payload: response.data.response,
          });
          showToast('You editted your profile!');
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onUserChangePassword = (
  id: number,
  old_password: string,
  password: string,
  password_again: string,
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .put<Response>(`${BASE_URL}users/change_password/${id}`, {
          old_password,
          password,
          password_again,
        })
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            showToast(response.data.response);
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onGetAllUsers = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .get<Response & UserModel>(`${BASE_URL}all/users/${id}`)
        .then(response => {
          if (response.data.status == 'error') {
            showToast(response.data.response);
          } else {
            dispatch({
              type: 'ON_GET_ALL_USERS',
              payload: response.data.response,
            });
          }
        })
        .catch(err => console.log(err));
    } catch (error) {
      dispatch({
        type: 'ON_USER_ERROR',
        payload: {message: 'Error : ' + error},
      });
    }
  };
};

export const onLikePost = (post_id: number, user_id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios.post(`${BASE_URL}post/like`, {
        post_id,
        user_id,
      });
    } catch (error) {
      showToast('Error : ' + error);
    }
  };
};

export const onMakeComment = (
  comment: string,
  post_id: number,
  user_id: number,
) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios.post(`${BASE_URL}postcomments/make`, {
        comment,
        post_id,
        user_id,
      });
    } catch (error) {
      showToast('Error : ' + error);
    }
  };
};

export const onDeleteComment = (id: number) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios.post(`${BASE_URL}postcomments/delete`, {
        id,
      });
    } catch (error) {
      showToast('Error : ' + error);
    }
  };
};

export const onForgotPassword = (email: string) => {
  return async (dispatch: Dispatch<UserAction>) => {
    try {
      await axios
        .post<Response>(`${BASE_URL}users/forgot`, {
          email,
        })
        .then(response => {
          showToast(response.data.response);
        })
        .catch(err => console.log(err));
    } catch (error) {
      showToast('Error : ' + error);
    }
  };
};
