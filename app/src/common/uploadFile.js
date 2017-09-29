import RNFetchBolb from 'react-native-fetch-blob'

export default function uploadFile (uploadInfo, cb) {
    return function (dispatch, getState) {
        const { token, key, path, type } = uploadInfo
        let body = [{
            name: 'token',
            data: token
        }, {
            name: 'key',
            data: key
        }, {
            name: 'file',
            filename: key || 'file',
            data: RNFetchBolb.wrap(path)
        }]

        RNFetchBolb
            .fetch('POST', 'http://upload.qiniu.com', {
                'Content-Type': 'multipart/form-data'
            }, body)
            .progress((received, total) => {
                dispatch({
                    type: 'UPLOADING_' + type,
                    status: 'uploading',
                    progress: received / total 
                })
            })
            .then(response => response.json())
            .then(response => {
                console.log('upload success')
                cb(dispatch, getState)
            })
            .catch(err => {
                dispatch({
                    type: 'UPLOAD_' + type + '_FAIL',
                    err: err,
                    status: 'fail'
                })
            })
    }
}
