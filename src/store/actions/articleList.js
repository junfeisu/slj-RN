import fetch from '../../common/fetch'

export function getArticleList (getArticleListFilter) {
    return function (dispatch) {
        fetch({
            url: '/article/list',
            params: getArticleListFilter
        }).then(response => {
                dispatch({
                    type: 'GET_ARTICLELIST_SUCC',
                    articleList: response.data,
                    status: 'succ'
                })
            })
            .catch(err => {
                dispatch({
                    type: 'GET_ARTICLELIST_FAIL',
                    err: err.response.data,
                    status: 'fail'
                })
            })
    }
}

export function gettingArticleList () {
    return {
        type: 'GETTING_ARTICLELIST',
        status: 'loading'
    }
}
