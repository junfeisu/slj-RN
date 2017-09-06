const Joi = require('joi')
const validate = require('../utils/validate')
const userModel = require('../schemas/userSchema')

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
        console.log('test')
        new userModel(userInfo).save((err, result) => {
            console.log(result)
            err ? reply(err).code(500) : reply(result)
        })
    }
}

module.exports = [addUser]
