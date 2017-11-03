import fetch from '../../common/fetch'

const domain = 'http://owu5dbb9y.bkt.clouddn.com'

const getDownloadUrl = (info, dispatch) => {
    fetch({
        url: '/upload/download',
        method: 'POST',
        data: {
            domain: domain,
            key: info.key
        }
    }).then(response => {
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
        fetch({
            url: '/user/update/' + info.userId,
            method: 'POST',
            data: {
                user_icon: info.key
            }
        }).then(response => {
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
