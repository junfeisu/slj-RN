const token = require('./token')

const validateToken = (req, reply) => {
    let headers = req.headers
    console.log(headers)
    if (headers.hasOwnProperty('authorization')) {
        let result = token.verify(headers.authorization)
        
        if (!result) {
            reply({message: 'token is expired'}).code(400)
            return false
        } else {
            return true
        }
    } else {
        reply({message: 'Authorization header is need'}).code(400)
        return false
    }
}

module.exports = validateToken
