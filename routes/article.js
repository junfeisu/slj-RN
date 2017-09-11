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
            query: {
                skip: Joi.number().integer().min(0).required()
            }
        }
    },
    handler: (req, reply) => {
        if (validateToken(req, reply)) {
            let skipNum = req.query.skip
            
            articleModel.aggregate({$skip: skipNum}, {$sort: {article_id: -1}}, {$limit: 10}, (err, result) => {
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

// 添加新文章
let addArticle = {
    method: 'PUT',
    path: '/article/add',
    config: {
        validate: {
            payload: {
                title: Joi.string().min(1).required(),
                content: Joi.string().min(1).required(),
                author: Joi.number().integer().min(1).required(),
                create_date: Joi.string().regex(/^(19[0-9]{2}|20[0-1][0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/),
                tags: Joi.array().required()
            }
        }
    },
    handler: (req, reply) => {
        if (validateToken(req, reply)) {
            let articleInfo = req.payload

            new articleModel(articleInfo).save((err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err.message))
                } else {
                    reply(result)
                }
            })
        }
    }
}

// 删除文章
let removeArticle = {
    method: 'DELETE',
    path: '/article/remove',
    config: {
        validate: {
            payload: {
                articleId: Joi.number().integer().min(1).required()
            }
        }
    },
    handler: (req, reply) => {
        if (validateToken(req, reply)) {
            let articleId = req.payload.articleId

            articleModel.remove({article_id: articleId}, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err.message))
                } else {
                    result.result.n ? reply({message: '删除文章成功'}) : reply({message: '删除文章失败'})
                }
            })
        }
    }
}

module.exports = [getArticleList, getSingleArticle, addArticle, removeArticle]
