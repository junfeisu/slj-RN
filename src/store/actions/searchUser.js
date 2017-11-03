import fetch from '../../common/fetch'

export default function searchUser(query) {
    return function (dispatch) {
        fetch({
            url: '/user/search',
            params: {
                query: query
            }
        }).then(res => {
              dispatch({
                  type: 'searchUserSucc',
                  users: res.data
              })
          })
          .catch(err => {
              dispatch({
                  type: 'searchUserFail',
                  err: err.response.data
              })
          })
    }
}
