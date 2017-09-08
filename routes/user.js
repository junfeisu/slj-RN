const Boom = require('boom')
const Joi = require('joi')
const userModel = require('../schemas/userSchema')

const returnInfo = {
    _id: 0,
    username: 1,
    user_id: 1,
    birthday: 1,
    slogan: 1
}

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
        let matchInfo = {
            user_id: userId
        }

        userModel.aggregate([{$match: matchInfo}, {$project: returnInfo}], (err, result) => {
            if (err) {
                reply(Boom.badImplementation(err.message))
            } else {
                if (result.length) {
                    reply(result[0])
                } else {
                    reply({message: 'user_id is not exist'}).code(400)
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
                reply(Boom.badImplementation(err.message))
            } else {
                delete result._doc.password
                delete result._doc._id
                reply(result._doc)
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
                username: Joi.string().min(1),
                slogan: Joi.string().min(1),
                user_icon: Joi.string().regex(/^.+\.[jpg|jpeg|png|gif]$/),
                birthday: Joi.string().regex(/^(19[0-9]{2}|20[0-1][0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/)
            }
        }
    },
    handler: (req, reply) => {
        let userId = req.params.userId
        let modifiedInfo = req.payload

        userModel.update({user_id: userId}, {$set: modifiedInfo}, (err, result) => {
            if (err) {
                reply(Boom.badImplementation(err.message))
            } else {
                result.nModified ? reply({message: '更改信息成功'}) : reply({message: '更改信息失败'})
            }
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
                reply(Boom.badImplementation(err.message))
            } else {
                if (result.length) {
                    for (let i = 0, userLen = result.length; i < userLen; i++) {
                        if (result[i].password === userInfo.password) {
                            delete result[i]._doc.password
                            delete result[i]._doc._id
                            reply(result[i]._doc)
                            return
                        }
                    }
                    reply(Boom.forbidden('password is not right'))
                } else {
                    reply(Boom.badRequest('user is not found'))
                }
            }
        })
    }
}

module.exports = [getUser, addUser, updateUser, loginUser]
