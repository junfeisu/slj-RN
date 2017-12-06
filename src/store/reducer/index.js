import { combineReducers } from 'redux'
import loginReducer from './login'
import registerReducer from './register'
import updatePasswordReducer from './updatePassword'
import profileReducer from './profile'
import articleListReducer from './articleList'
import articleDetailReducer from './articleDetail'
import searchUserReducer from './searchUser'
import addNewArticleReducer from './addNewArticle'

const rootReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer,
    updatePasswordState: updatePasswordReducer,
    articleListState: articleListReducer,
    articleDetailState: articleDetailReducer,
    addNewArticleState: addNewArticleReducer,
    profileState: profileReducer,
    searchUserState: searchUserReducer
})

export default rootReducer
