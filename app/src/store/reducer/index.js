import { combineReducers } from 'redux'
import loginReducer from './login'
import registerReducer from './register'
import updatePasswordReducer from './updatePassword'
import profileReducer from './profile'
import articleListReducer from './articleList'

const rootReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer,
    updatePasswordState: updatePasswordReducer,
    articleListState: articleListReducer,
    profileState: profileReducer
})

export default rootReducer
