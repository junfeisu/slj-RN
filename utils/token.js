const jsonWebToken = require('jsonwentoken')
const secret = 'sjf203529'

// 生成token
const generateToken = () => {
    let token = jsonWebToken.sign({
        name: 'slj',
    }, secret, {
        expiresIn: '1h' // 过期时间
    })
    console.log('token is ' + token)

    return token
}

// 验证token
const verify = (token) => {
    try {
        let decoded = jsonWebToken.verify(token, secret)

        if (decoded) {
            return decoded.name === 'slj'
        } else {
            return false
        }
    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    generateToken,
    verify
}
