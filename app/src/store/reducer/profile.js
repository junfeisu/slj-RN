const initState = {
    user_icon: "",
    status: 'unUpload',
    progress: 0,
    err: null
}

const actionHandlers = {
    UPLOAD_AVATAR_SUCC: (state, action) => {
        return {...state, user_icon: action.user_icon, status: action.status}
    },
    UPLOAD_AVATAR_FAIL: (state, action) => {
        return {...state, err: action.err, status: action.status}
    },
    UPLOADING_AVATAR: (state, action) => {
        return {...state, status: action.status, progress: action.progress}
    }
}

export default function profile(state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]
    return currentActionHandler ? currentActionHandler(state, action) : state
}
