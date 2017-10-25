import axios from 'axios'
import host from '../../common/config'

export function getArticleList (getArticleListFilter, token) {
    return function (dispatch) {
        axios.get(host + '/article/list', {
            params: getArticleListFilter,
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
