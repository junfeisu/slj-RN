const Joi = require('joi')
const Boom = require('boom')
const validateToken = require('../utils/interceptor')
const articleModel = require('../schemas/articleSchema')
const commentModel = require('../schemas/commentSchema').model

let getArticleList = {
    method: 'GET',
    path: '/article/list',
    config: {
        validate: {
            params: {
                skip: Joi.number().integer().min(0).required()
            }
        }
    },
    handler: (req, reply) => {
        if (validateToken(req, reply)) {
            let skipNum = req.params.skip
            
            articleModel.aggreate({$skip: skipNum}, {$sort: {article_id: -1}}, {$limit: 10}, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err.message))
                } else {
                    reply(result)
                }
            })
        }
    }
}
