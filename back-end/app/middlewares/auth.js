const jwt = require('jsonwebtoken')

const secret = 'test'

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    let decodeData
    if (token) {
      decodeData = jwt.verify(token, secret)
      req.userId = decodeData?.id
    }
    next()
  } catch (err) {
    console.log(err)
  }
}
module.exports = auth
