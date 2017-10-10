import axios from 'axios'

const REGISTER_SUCC = 'REGISTER_SUCC'
const REGISTER_FAIL = 'REGISTER_FAIL'
const REGISTERING = 'REGISTERING'

export function register(userInfo) {
    return function (dispatch) {
        axios.put('http://localhost:8000/user/add', userInfo)
            .then(response => {
                dispatch({
                    type: REGISTER_SUCC,
                    user: response.data,
                    status: 'succ'
                })
            })
            .catch(err => {
                dispatch({
                    type: REGISTER_FAIL,
                    err: err.response.data,
                    status: 'fail'
                })
            })
    }
}

export function registering() {
    return {
        type: REGISTERING,
        status: 'registering'
    }
}
