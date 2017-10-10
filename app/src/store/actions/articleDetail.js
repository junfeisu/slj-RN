import axios from 'axios'

export function getSingleArticle (articleId, token) {
    return function (dispatch) {
        axios.get('http://localhost:8000/article/' + articleId, {
            headers: {
                Authorization: token
            }
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

export function gettingArticle () {
    return {
        type: 'GETTING_ARTICLE',
        status: 'loading'
    }
}
