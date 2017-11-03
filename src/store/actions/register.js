import fetch from '../../common/fetch'

export function register(userInfo) {
    return function (dispatch) {
        fetch({
            url: '/user/add',
            method: 'PUT',
            data: userInfo
        }).then(response => {
              dispatch({
                  type: 'REGISTER_SUCC',
                  user: response.data,
                  status: 'succ'
              })
          })
          .catch(err => {
              dispatch({
                  type: 'REGISTER_FAIL',
                  err: err.response.data,
                  status: 'fail'
              })
          })
    }
}

export function registering() {
    return {
        type: 'REGISTERING',
        status: 'registering'
    }
}
