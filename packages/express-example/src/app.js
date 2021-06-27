// @ts-check

/* eslint-disable no-console */

const express = require('express')

const app = express()
app.use(express.json())
app.set('views', 'src/views')
app.set('view engine', 'pug')

const userRouter = require('./routers/user')

app.use('/users', userRouter)
app.use('/public', express.static('src/public'))
app.use('/uploads', express.static('uploads'))

// 4개의 인자를 받아야만 error handler로 동작하므로, 사용하지 않는 변수(`next`)가 있더라도 eslint 에러가 나지 않도록 합니다.
/* eslint-disable no-unused-vars */
// @ts-ignore
app.use((err, req, res, next) => {
  /* eslint-enable no-unused-vars */
  res.statusCode = err.statusCode || 500
  res.send(err.message)
})

module.exports = app
