import fetch from '../../common/fetch'

export function getSingleArticle (articleId) {
    return function (dispatch) {
        fetch({
            url: '/article/' + articleId
        }).then(response => {
            dispatch({
                type: 'GET_ARTICLE_SUCC',
                data: response.data,
                status: 'succ'
            })
        }).catch(err => {
            dispatch({
                type: 'GET_ARTICLE_FAIL',
                err: err.response.data,
                status: 'fail'
            })
        })
    }
}

export function uploadComment (commentInfo) {
    return function (dispatch) {
        fetch({
            url: '/comment/add',
            method: 'PUT',
            data: commentInfo
        }).then(response => {
            getSingleArticle(response.data.article_id)(dispatch)
        }).catch(err => {
            dispatch({
                type: 'GET_ARTICLE_FAIL',
                err: err.response.data,
                status: 'fail'
            })
        })
    }
}

export function gettingArticle () {
    return {
        type: 'GETTING_ARTICLE',
        status: 'loading'
    }
}
