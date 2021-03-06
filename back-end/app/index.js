const express = require('express')

const app = express()
require('./boot')
require('./middlewares')(app)
require('./routes')(app)
require('./middlewares/exeception')(app)
require('./middlewares/404')(app)

module.exports = (port) => {
  app.listen(port, () => {
    console.log(`app run on port ${port}`)
  })
}
