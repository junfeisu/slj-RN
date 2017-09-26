import { combineReducers } from 'redux'
import loginReducer from './login'
import registerReducer from './register'
import updatePasswordReducer from './updatePassword'

const rootReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer,
    updatePasswordState: updatePasswordReducer
})

export default rootReducer
