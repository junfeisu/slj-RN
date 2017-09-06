var express = require('express')
var path = require('path')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var cons = require('consolidate')
var app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use(formidable)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

var server = app.listen(8000, function () {
  console.log('Server start at 127.0.0.1:8000')
})

/*
 *下面是用socket实现的服务端与客户端信息同步
 *第一个‘addme’是说明客户端与服务端的连接已经建立
 *第二个‘comment’是当客户端发表评论时将评论存进mongodb，不管成功都向客户端广播一个处理事件('error' 和 'update')
 */
var io = require('socket.io')(server)

io.on('connection', function (socket) {
  socket.on('addme', function () {
    console.log('addme')
  })
  socket.on('comment', function (comment) {
    console.log('comment')
    mongo.add(new model['Comment'](comment), function (err, res) {
      err ? io.emit('comment_error', err) : io.emit('comment_update', res)
    })
  })
  socket.on('topic', function (topic) {
    console.log('topic')
    mongo.add(new model['Topic'](topic), function (err, res) {
      err ? io.emit('topic_error', err) : io.emit('topic_update', res)
    })
  })
})