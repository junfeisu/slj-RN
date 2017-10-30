const initState = {
    articleList: [],
    status: 'unload',
    err: null
}

const actionHandlers = {
    'GET_ARTICLELIST_SUCC': (state, action) => {
        return {...state, articleList:action.articleList, status: action.status}
    },
    'GET_ARTICLELIST_FAIL': (state, action) => {
        return {...state, err: action.err, status: action.status}
    },
    'GETTING_ARTICLELIST': (state, action) => {
        return {...state, status: action.status}
    }
}

export default function article (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]
    return currentActionHandler ? currentActionHandler(state, action) : state
}
