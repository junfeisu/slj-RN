const initState = {
    users: [],
    err: null
}

const actionHandlers = {
    searchUserSucc: (state, action) => {
        return {...state, users: action.users}
    },
    searchUserFail: (state, action) => {
        return {...state, err: action.err}
    }
}

export default function searchUser (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]
    return currentActionHandler ? currentActionHandler(state, action) : state
}
