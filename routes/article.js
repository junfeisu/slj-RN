const Joi = require('joi')
const Boom = require('boom')
const validateToken = require('../utils/interceptor')
const articleModel = require('../schemas/articleSchema')
const commentModel = require('../schemas/commentSchema').model

// 获取文章列表
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

// 获取单个文章
let getSingleArticle = {
    method: 'GET',
    path: '/article/{articleId}',
    config: {
        validate: {
            params: {
                articleId: Joi.number().integer().min(1).required()
            }
        }
    },
    handler: (req, reply) => {
        if (validateToken(req, reply)) {
            let articleId = req.params.articleId

            articleModel.find({article_id: articleId}, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err.message))
                } else {
                    !result.length ? reply(Boom.badRequest('article_id is not found')) : reply(result[0])
                }
            })
        }
    }
}
