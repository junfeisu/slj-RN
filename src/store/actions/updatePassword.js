import fetch from '../../common/fetch'

export function updatePassword (info) {
    return function (dispatch) {
        fetch({
            url: '/user/password',
            method: 'POST',
            data: info
        }).then(response => {
              dispatch({
                  type: 'UPDATE_PASSWORD_SUCC',
                  status: 'succ',
                  result: response.data
              })
          })
          .catch(err => {
              dispatch({
                  type: 'UPDATE_PASSWORD_FAIL',
                  status: 'fail',
                  err: err.response.data
              })
          })
    }
}

export function updatePasswording () {
    return {
        type: 'UPDATE_PASSWORDING',
        status: 'updating'
    }
}
