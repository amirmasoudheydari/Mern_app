const userRouter = require('./users')
const userTour = require('./tour')
module.exports = (app) => {
  app.use('/users', userRouter)
  app.use('/tour', userTour)
}
