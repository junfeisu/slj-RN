import fetch from '../../common/fetch'

export default function addNewArticle (article) {
    return function (dispatch) {
        fetch({
            url: '/article/add',
            method: 'PUT',
            data: article
        }).then(response => {
            dispatch({
                type: 'PUBLISH_ARTICLE_SUCC',
                data: response.data,
                status: 'succ'
            })
        }).catch(err => {
            dispatch({
                type: 'PUBLISH_ARTICLE_FAIL',
                err: err.response.data,
                status: 'fail'
            })
        })
    }
}
