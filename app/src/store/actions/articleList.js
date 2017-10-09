import axios from 'axios'

export function getArticleList (skipNum, token) {
    return function (dispatch) {
        axios.get('http://localhost:8000/article/list?skip=' + skipNum, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
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
