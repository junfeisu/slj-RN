import axios from 'axios'
import host from '../../common/config'

const domain = 'http://owu5dbb9y.bkt.clouddn.com'

const getDownloadUrl = (info, dispatch) => {
    axios.post(host + '/upload/download', {
        domain: domain,
        key: info.key
    }, {headers: {
        Authorization: info.token
    }})
        .then(response => {
            dispatch({
                type: 'UPLOAD_AVATAR_SUCC',
                user_icon: response.data.url,
                status: 'succ'
            })
        })
        .catch(err => {
            dispatch({
                type: 'UPLOAD_AVATAR_FAIL',
                err: err.response.data,
                status: 'fail'
            })
        })
}

export function updateAvatar (info) {
    return function (dispatch) {
        axios.post(host + '/user/update/' + info.userId, {
            user_icon: info.key
        }, {headers: {
            Authorization: info.token
        }})
            .then(response => {
                getDownloadUrl(info, dispatch)
            })
            .catch(err => {
                dispatch({
                    type: 'UPLOAD_AVATAR_FAIL',
                    err: err.response.data,
                    status: 'fail'
                })
            })
    }
}
