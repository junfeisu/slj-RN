const token = require('./token')

const validateToken = (req, reply) => {
    let headers = req.headers
    if (headers.hasOwnProperty('Authorization')) {
        let result = token.verify(headers.Authorization)
        
        if (!result) {
            reply({message: 'token is expired'}).code(400)
            return false
        } else {
            return true
        }
    }
}

module.exports = validateToken
