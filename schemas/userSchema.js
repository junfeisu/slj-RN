const mongoose = require('mongoose')
const Schema = mongoose.Schema
const userGenerate = require('./sequence').user

const userSchema = new Schema({
    user_id: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthday: {
        type: String,
        required: false,
        default: '1996-07-28'
    },
    user_icon: {
        type: String,
        required: false,
        default: "https://ohjoq511u.qnssl.com/2016-10-19-07-21-15-290709/1-14092G22551.jpg"
    },
    slogan: {
        type: String,
        required: false,
        default: 'slj is forever'
    }
}, {versionKey: false})

userSchema.index({username: 1, password: 1}, {unique: true})

// userId自增
userSchema.pre('save', function(next) {
    let self = this
    if (this.isNew) {
        userGenerate.increase('User', function (err, result) {
            if (err) {
                console.log('err is ' + JSON.stringify(err))
            } else {
                self.user_id = result.value.next
                next()
            }
        })
    } else {
        next()
    }
})

module.exports = mongoose.model('User', userSchema)
