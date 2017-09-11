const commentModel = require('../schemas/commentSchema').model

const utils = {
    deleteComments (articleId, events) {
        commentModel.remove({article_id: articleId}, (err, result) => {
            if (err) {
                events.emit('deleteArticleError', err.message)
            } else {
                events.emit('deleteCommentsNormal', result.result.n)
            }
        })
    },
    getComments (articleId, events) {
        commentModel.find({article_id: articleId}, (err, result) => {
            if (err) {
                events.emit('deleteArticleError', err.message)
            } else {
                events.emit('getCommentsNormal', result.length)
            }
        })
    }
}

module.exports = utils
