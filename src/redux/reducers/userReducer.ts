import { UserAction } from "../actions";
import { AccountModel, UserModel, UserState, ErrorModel } from "../models";

const initialState: UserState = {
    user: {} as UserModel,
    account: {} as AccountModel,
    error: {} as ErrorModel
}


const UserReducer = (state: UserState = initialState, action: UserAction) => {


    switch (action.type) {
        case "ON_USER_LOGIN":
            return {
                ...state,
                user: action.payload
            }
        
        case "ON_USER_ERROR":
            return {
                ...state,
                error : action.payload
            }

        

        
        
    
        default:
            return state;
    }


}


export { UserReducer }