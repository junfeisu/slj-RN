const initState = {
    article: {},
    err: null,
    status: 'unPublish'
}

const actionHandlers = {
    'PUBLISH_ARTICLE_SUCC': (state, action) => {
        return {...state, article: action.data, status: action.status}
    },
    'PUBLISH_ARTICLE_FAIL': (state, action) => {
        return {...state, err: action.err, status: action.status}
    }
}

export default function addNewArticle (state = initState, action) {
    let currentActionHandler = actionHandlers[action.type]
    return currentActionHandler ? currentActionHandler(state, action) : state
}
