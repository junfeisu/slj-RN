import { combineReducers } from 'redux'
import loginReducer from './login'
import registerReducer from './register'

const rootReducer = combineReducers({
    loginState: loginReducer,
    registerState: registerReducer
})

export default rootReducer
