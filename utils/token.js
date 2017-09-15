const jsonWebToken = require('jsonwebtoken')
const secret = 'sjf203529'

// 生成token
const generateToken = () => {
    let token = jsonWebToken.sign({
        name: 'slj',
    }, secret, {
        expiresIn: '1h' // 过期时间
    })

    return token
}

const generateTestToken = () => {
    let testToken = jsonWebToken.sign({
        name: 'slj'
    }, secret, {
        expiresIn: '1m'
    })
}

// 验证token
const verify = (token) => {
    let result = {
        isValid: true,
        error: ''
    }

    try {
        let decoded = jsonWebToken.verify(token, secret)

        if (decoded.name === 'slj') {
            return result
        }
    } catch (err) {
        result.isValid = false
        result.error = err
        return result
    }
}

module.exports = {
    generateToken,
    verify
}
