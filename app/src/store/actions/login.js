import axios from 'axios'

const SET_USER_INFO = 'SET_USER_INFO'
const LOGIN_FAIL = 'LOGIN_FAIL'
const LOGINING = 'LOGINING'

export function login () {
    return function (dispatch, userInfo) {
        axios.post('http://localhost:8000/user/login', userInfo)
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
                    err: err
                })
            })
    }
}

export function loading() {
    return function (dispatch) {
        dispatch({
            type: LOGINING,
            loginStatus: 'logining'
        })
    }
}
