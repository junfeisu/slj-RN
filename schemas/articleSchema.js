const mongoose = require('mongoose')
const Schema = mongoose.Schema
const articleGenerate = require('./sequence').article
const commentSchema = require('./commentSchema').schema

let articleSchema = new Schema({
    article_id: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        required: true,
        default: Date.now()
    },
    tags: {
        type: [String],
        required: true
    },
    comments: [commentSchema]
}, {versionKey: false})

articleSchema.index({article_id: 1}, {unique: true})

articleSchema.pre('save', function (next) {
    let self = this
    if (self.isNew) {
        articleGenerate.increase('Article', (err, result) {
            if (err) {
                console.log('err is ' + JSON.stringify(err))
            } else {
                self.article_id = result.next.value
                next()
            }
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('Article', articleSchema)
