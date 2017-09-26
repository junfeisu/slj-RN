import axios from 'axios'

const UPDATE_PASSWORD_SUCC = 'UPDATE_PASSWORD_SUCC'
const UPDATE_PASSWORD_FAIL = 'UPDATE_PASSWORD_FAIL'
const UPDATE_PASSWORDING = 'UPDATE_PASSWORDING'

export function updatePassword (info) {
    return function (dispatch) {
        axios.post('http://localhost:8000/user/password')
            .then(response => {
                dispatch({
                    type: UDPATE_PASSWORD_SUCC,
                    status: 'succ',
                    result: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: UPDATE_PASSWORD_FAIL
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
