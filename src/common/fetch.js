import axios from 'axios'
import host from './config'

let token = ''

export function updateToken (newToken) {
    if (newToken && newToken !== token) {
        token = newToken
        console.log(token)
    }
}

const fetch = ({url = '', method = 'GET', data = {}, params = {}}) => {
    return new Promise((resolve, reject) => {
        axios.request({
            url: host + url,
            method: method,
            data: data,
            params: params,
            headers: {
                Authorization: token
            }
        }).then(response => {
            resolve(response)
        }).catch(err => {
            reject(err)
        })
    })
}

export default fetch
