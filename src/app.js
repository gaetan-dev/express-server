import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import createLogger from 'morgan'
// import csrfProtect from 'csurf'
import express from 'express'
import flash from 'connect-flash'
import methodOverride from 'method-override'
import mongoose from 'mongoose'
import Path from 'path'

import 'colors'

import mainController from './controllers/main'
import examplesController from './controllers/examples'

mongoose.Promise = Promise

const app = express()

app.set('views', Path.resolve(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(express.static(Path.resolve(__dirname, '../public')))
// Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
// Parse application/json
app.use(bodyParser.json())
// Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
app.use(methodOverride((req) => req.body._method))

// HTTP request logger middleware for node.js
if (app.get('env') !== 'test') {
  app.use(createLogger(app.get('env') === 'development' ? 'dev' : 'combined'))
}

app.use(cookieSession({ name: 'example:session', secret: 'd63af54c-c12f-4386-b714-58b39a729fd5' }))

// CSRF protection middleware.
// if (app.get('env') !== 'test') {
//   app.use(csrfProtect())
// }

// The flash is a special area of the session used for storing messages.
app.use(flash())

app.use((req, res, next) => {
  // if (req.csrfToken) {
  //   res.locals.csrfToken = req.csrfToken()
  // }
  res.locals.flash = req.flash()
  res.locals.query = req.query
  res.locals.url = req.url
  res.locals.user = req.user
  next()
})

app.use(mainController)
app.use('/example', examplesController)

export default app
