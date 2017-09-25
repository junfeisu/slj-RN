import { REGISTER_SUCC, REGISTER_FAIL, REGISTERING } from '../actions/login'

const initState = {
    user: {
        username: '',
        user_id: '',
        slogan: '',
        birthday: ''
    },
    status: 'unRegister',
    err: null
}

const actionHandlers = {
    REGISTER_SUCC: (state, action) => {
        return {...state, user: action.user, status: action.status}
    },
    REGISTER_FAIL: (state, action) => {
        return {...state, status: action.status, err: action.err}
    },
    REGISTERING: (state, action) => {
        return {...state, status: action.status}
    }
}

export default function login (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]

    return currentActionHandler ? currentActionHandler(state, action) : state
}
