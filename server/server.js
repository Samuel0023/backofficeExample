const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
require('dotenv').config()

const { createServer } = require('http')
const indexRouter = require('../routes/index')

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.server = createServer(this.app)
    this.paths = { }
    // connection db

    // middlewares
    this.middlewares()
    // routes
    this.routes()

    // error handlers
    this.errorHandlers()
  }

  middlewares() {
    this.app.use(cors())

    this.app.use(logger('dev'))
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: false }))
    this.app.use(cookieParser())
    this.app.use(express.static(path.join(__dirname, 'public')))
  }

  routes() {
    this.app.use('/', indexRouter)
    // this.app.use(this.paths.auth, require('./user/routes/user.auth.routes'))
  }

  errorHandlers() {
    this.app.use((req, res, next) => {
      next(createError(404))
    })

    // error handler
    this.app.use((err, req, res) => {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}

      // render the error page
      res.status(err.status || 500)
      res.render('error')
    })
  }

  listen() {
    this.server.listen(this.port, () => {
    // eslint-disable-next-line no-console
      console.log('servidor corriendo en puerto ', this.port)
    })
  }
}

module.exports = Server
