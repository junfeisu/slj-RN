import fetch from '../../common/fetch'

export function login (userInfo) {
    return function (dispatch) {
        fetch({
            url: '/user/login',
            method: 'POST',
            data: userInfo
        }).then(response => {
              dispatch({
                  type: 'SET_USER_INFO',
                  user: response.data,
                  status: 'succ'
              })
          })
          .catch(err => {
              dispatch({
                  type: 'LOGIN_FAIL',
                  status: 'fail',
                  err: err.response.data
              })
          })
    }
}

export function loading() {
    return {
        type: 'LOGINING',
        status: 'logining'
    }
}
