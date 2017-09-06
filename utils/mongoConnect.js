const mongoose = require('mongoose')
const db = mongoose.connection

const connectMongo = () => {
    mongoose.connect('mongodb://localhost/sljRN')

    db.on('error', console.error.bind(console, 'connection mongodb sljRN fail:'))
    db.on('open', () => console.log('mongodb connection has been established'))
}

module.exports = connectMongo
