const mongoose = require('mongoose')
const Schema = mongoose.Schema
const models = {}

const UserGenerateSchema = new Schema({
    _id: String,
    next: {
        type: Number,
        default: 1
    }
})

const increase = (schemaName, cb) => {
    return this.collection.findOneAndUpdate(
        {"_id": schemaName},
        {$inc: {"next": 1}},
        {upsert: true, returnNewDocument: true},
        cb
    )
}

UserGenerateSchema.statics.increase = increase

models.user = mongoose.model('UserGenerate', UserGenerateSchema)

module.exports = models
