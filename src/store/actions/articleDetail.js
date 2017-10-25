import axios from 'axios'
import host from '../../common/config'

export function getSingleArticle (articleId, token) {
    return function (dispatch) {
        axios.get(host + '/article/' + articleId, {
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

export function uploadComment (commentInfo, token) {
    return function (dispatch) {
        axios.put(host + '/comment/add', commentInfo, {
            headers: {
                Authorization: token
            }
        }).then(response => {
            getSingleArticle(response.data.article_id, token)(dispatch)
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
