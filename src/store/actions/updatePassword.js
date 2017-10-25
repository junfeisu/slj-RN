import axios from 'axios'
import host from '../../common/config'

const UPDATE_PASSWORD_SUCC = 'UPDATE_PASSWORD_SUCC'
const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL'
const UPDATE_PASSWORDING = 'UPDATE_PASSWORDING'

export function updatePassword (info, token) {
    return function (dispatch) {
        axios.post(host + '/user/password', info, {
            headers: {
                Authorization: token
            }
        })
            .then(response => {
                dispatch({
                    type: UPDATE_PASSWORD_SUCC,
                    status: 'succ',
                    result: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_PASSWORD_FAIL,
                    status: 'fail',
                    err: err.response.data
                })
            })
    }
}

export function updatePasswording () {
    return {
        type: UPDATE_PASSWORDING,
        status: 'updating'
    }
}
