import axios from 'axios'

const domain = 'http://owu5dbb9y.bkt.clouddn.com'

const getDownloadUrl = (info, dispatch) => {
    console.log('get download url')
    axios.post('http://localhost:8000/upload/download', {
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
    console.log('updatePassword')
    return function (dispatch) {
        axios.post('http://localhost:8000/user/update/' + info.userId, {
            user_icon: domain + '/' + info.key
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
