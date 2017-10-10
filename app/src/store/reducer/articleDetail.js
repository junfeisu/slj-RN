const initState = {
    article: {
        title: '',
        content: '',
        create_date: '',
        author: {},
        tags: [],
        comments: []
    },
    err: null,
    status: 'unload'
}

const actionHandlers = {
    'GET_ARTICLE_SUCC': (state, action) => {
        return {...state, article: action.data, status: action.status}
    },
    'GET_ARTICLE_FAIL': (state, action) => {
        return {...state, err: action.err, status: action.status}
    },
    'GETTING_ARTICLE': (state, action) => {
        return {...state, status: action.status}
    }
}

export default function articleDetail (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]
    return currentActionHandler ? currentActionHandler(state, action) : state
}
