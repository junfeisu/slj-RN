const initState = {
    user: {
        username: '',
        user_id: '',
        slogan: '',
        birthday: '',
        user_icon: 'https://ohjoq511u.qnssl.com/2016-10-19-07-21-15-290709/1-14092G22551.jpg'
    },
    status: 'unLogin',
    err: null
}

const actionHandlers = {
    SET_USER_INFO: (state, action) => {
        return {...state, user: action.user, status: action.status}
    },
    LOGIN_FAIL: (state, action) => {
        return {...state, status: action.status, err: action.err}
    },
    LOGINING: (state, action) => {
        return {...state, status: action.status}
    }
}

export default function login (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]

    return currentActionHandler ? currentActionHandler(state, action) : state
}
