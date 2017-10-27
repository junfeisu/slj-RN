import axios from 'axios'
import host from '../../common/config'

export default function searchUser(query, token) {
    return function (dispatch) {
        axios.get(host + '/user/search', {
            params: {
                query: query
            },
            headers: {
                Authorization: token
            }
        })
            .then(res => {
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
