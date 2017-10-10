import { combineReducers } from 'redux'
import loginReducer from './login'
import registerReducer from './register'
import updatePasswordReducer from './updatePassword'
import profileReducer from './profile'
import articleListReducer from './articleList'
import articleDetailReducer from './articleDetail'

const rootReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer,
    updatePasswordState: updatePasswordReducer,
    articleListState: articleListReducer,
    articleDetailState: articleDetailReducer,
    profileState: profileReducer
})

export default rootReducer
