import { combineReducers } from 'redux'
import { UserReducer } from './userReducer'
import { PostReducer } from './postReducer'
import { CommentAndLikeReducer } from './CommentAndLikeReducer'

const rootReducer = combineReducers({
    userReducer: UserReducer,
    postReducer: PostReducer,
    commentAndLikeReducer: CommentAndLikeReducer,
})

export type ApplicationState = ReturnType<typeof rootReducer>

export { rootReducer }