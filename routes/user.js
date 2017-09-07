const Boom = require('boom')
const Joi = require('joi')
const userModel = require('../schemas/userSchema')
const deepCopy = require('../utils/deepCopy')

// 获取用户信息
let getUser = {
    method: 'GET',
    path: '/user/{userId}',
    config: {
        validate: {
            params: {
                userId: Joi.number().integer().min(1).required()
            }
        }
    },
    handler: (req, reply) => {
        let userId = req.params.userId

        userModel.find({user_id: userId}, (err, result) => {
            if (err) {
                reply(err).code(500)
            } else {
                if (result.length) {
                    let copiedResult = deepCopy(result[0])

                    delete copiedResult._doc.password
                    delete copiedResult._doc._id
                    reply(copiedResult._doc)
                } else {
                    reply({msg: 'user_id is not exist'}).code(400)
                }
            }
        })
    }
}

// 新增用户
let addUser = {
    method: 'PUT',
    path: '/user/add',
    config: {
        validate: {
            payload: {
                username: Joi.string().min(1).required(),
                password: Joi.string().min(6).required(),
                user_id: Joi.number().integer().min(1).required(),
                slogan: Joi.string().min(1),
                user_icon: Joi.string().regex(/^.+\.[jpg|jpeg|png|gif]$/),
                birthday: Joi.string().regex(/^(19[0-9]{2}|20[0-1][0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
            }
        }
    },
    handler: (req, reply) => {
        let userInfo = req.payload

        new userModel(userInfo).save((err, result) => {
            if (err) {
                reply(err).code(500)
            } else {
                let copiedResult = deepCopy(result[0])
                        
                delete copiedResult._doc.password
                delete copiedResult._doc._id
                reply(copiedResult._doc)
            }
        })
    }
}

// 修改用户信息
let updateUser = {
    method: 'POST',
    path: '/user/update/{userId}',
    config: {
        validate: {
            params: {
                userId: Joi.number().integer().min(1).required()
            },
            payload: {
                username: Joi.string().min(1).required(),
                slogan: Joi.string().min(1),
                user_icon: Joi.string().regex(/^.+\.[jpg|jpeg|png|gif]$/),
                birthday: Joi.string().regex(/^(19[0-9]{2}|20[0-1][0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
            }
        }
    },
    handler: (req, reply) => {
        let userId = req.params.id
        let modifiedInfo = req.payload

        userModel.update(({user_id: userId}, {$set: modifiedInfo}), (err, result) => {
            err ? reply(err).code(500) : reply(result)
        })
    }
}

// 用户登录
let loginUser = {
    method: 'POST',
    path: '/user/login',
    config: {
        validate: {
            payload: {
                username: Joi.string().min(1).required(),
                password: Joi.string().min(6).required()
            }
        }
    },
    handler: (req, reply) => {
        let userInfo = req.payload

        userModel.find({username: userInfo.username}, (err, result) => {
            if (err) {
                reply(err).code(500)
            } else {
                if (result.length) {
                    for (let i = 0, userLen = result.length; i < userLen; i++) {
                        if (result[i].password === userInfo.password) {
                            let copiedResult = deepCopy(result[0])
                        
                            delete copiedResult._doc.password
                            delete copiedResult._doc._id
                            reply(copiedResult._doc)
                            return
                        }
                    }
                    reply({msg: 'password is not right'}).code(403)
                } else {
                    reply({msg: 'user is not found'}).code(400)
                }
            }
        })
    }
}

module.exports = [getUser, addUser, updateUser, loginUser]
