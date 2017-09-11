const Joi = require('joi')
const Boom = require('boom')
const EventEmitter = require('events')
const validateToken = require('../utils/interceptor')
const articleModel = require('../schemas/articleSchema')
const commentUtil = require('../utils/commentUtil')
const events = new EventEmitter()

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

// 修改文章
let updateArticle = {
    method: 'POST',
    path: '/article/update/{articleId}',
    config: {
        validate: {
            params: {
                articleId: Joi.number().integer().min(1).required()
            },
            payload: {
                title: Joi.string().min(1),
                content: Joi.string().min(1),
                create_date: Joi.string().regex(/^(19[0-9]{2}|20[0-1][0-7])-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/),
                tags: Joi.array()
            }
        }
    },
    handler: (req, reply) => {
        if (validateToken(req, reply)) {
            let articleId = req.params.articleId
            let articleInfo = req.payload

            articleModel.update({article_id: articleId}, {$set: articleInfo}, (err, result) => {
                if (err) {
                    reply(Boom.badImplementation(err.message))
                } else {
                    result.nModified ? reply({message: '修改文章成功'}) : reply({message: '修改文章失败'})
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
            let comments = commentUtil.getComments(articleId)

            commentUtil.getComments(articleId, events)
            // 出现错误的处理
            events.on('deleteArticleError', err => {
                reply(Boom.badImplementation(err))
            })
            // 获取该文章的评论数正常时
            events.on('getCommentsNormal', commentsLen => {
                if (commentsLen) {
                    commentUtil.deleteComments(articleId, events)
                } else {
                    events.emit('deleteArticle')
                }
            })
            // 删除该文章的评论正常时
            events.on('deleteCommentsNormal', modifiedNum => {
                if (!modifiedNum) {
                    reply(Boom.badImplementation('删除文章评论失败'))
                } else {
                    events.emit('deleteArticle')
                }
            })

            events.on('deleteArticle', () => {
                articleModel.remove({article_id: articleId}, (err, result) => {
                    err ? reply(Boom.badImplementation(err.message))
                        : result.result.n ? reply({message: '删除文章成功'}) : reply({message: '删除文章失败'})
                })
            })

        }
    }
}

module.exports = [getArticleList, getSingleArticle, addArticle, updateArticle, removeArticle]
