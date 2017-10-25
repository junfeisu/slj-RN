import axios from 'axios'
import host from '../../common/config'

const SET_USER_INFO = 'SET_USER_INFO'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGINING = 'LOGINING'

export function login (userInfo) {
    return function (dispatch) {
        axios.post(host + '/user/login', userInfo)
            .then(response => {
                dispatch({
                    type: SET_USER_INFO,
                    user: response.data,
                    status: 'succ'
                })
            })
            .catch(err => {
                dispatch({
                    type: LOGIN_FAIL,
                    status: 'fail',
                    err: err.response.data
                })
            })
    }
}

export function loading() {
    return {
        type: LOGINING,
        status: 'logining'
    }
}
