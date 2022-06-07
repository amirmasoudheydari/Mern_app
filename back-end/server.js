require('dotenv').config()
const bootApplication = require('./app')
bootApplication(process.env.PORT || 3333)
