const initState = {
    status: 'unUpdate',
    err: null,
    result: {
        message: ''
    }
}

const actionHandlers = {
    UPDATE_PASSWORD_SUCC: (state, action) => {
        return {...state, result: action.result, status: action.status}
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
        return {...state, err: action.err, status: action.status}
    },
    UPDATE_PASSWORDING: (state, action) => {
        return {...state, status: action.status}
    }
}

export default function updatePassword (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]

    return currentActionHandler ? currentActionHandler(state, action) : state
}
