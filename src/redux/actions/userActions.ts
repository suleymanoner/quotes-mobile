import axios from "axios";
import { Dispatch } from "react";
import { BASE_URL } from "../../utils/Config";
import { UserModel } from "../models";


export interface UserLoginAction {
    readonly type: "ON_USER_LOGIN"
    payload: UserModel
}

export interface UserErrorAction {
    readonly type: "ON_USER_ERROR",
    payload: any
}

export type UserAction = UserLoginAction | UserErrorAction


export const onUserLogin = (email: string, password: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
            console.log("before login")
            const response = await axios.post<UserModel>(`${BASE_URL}users/login`, {
                email,
                password
            })



            console.log("after login")
            console.log(response.data);

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Login Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }

        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
}


export const onUserSignUp = (name: string, surname: string, email: string, password: string, username: string) => {

    return async (dispatch: Dispatch<UserAction>) => {

        try {
                 
            const response = await axios.post<UserModel>(`http://192.168.1.151/quotes-backend/api/users/register`, {
                name,
                surname,
                email,
                password,
                username
            })

            console.log(response.data);

            if(!response) {
                dispatch({
                    type: "ON_USER_ERROR",
                    payload: "User Login Error"
                })
            } else {
                dispatch({
                    type: "ON_USER_LOGIN",
                    payload: response.data
                })
            }

        } catch (error) {
            dispatch({
                type: "ON_USER_ERROR",
                payload: error
            })
        }
    }
} 