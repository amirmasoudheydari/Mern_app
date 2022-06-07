module.exports = (app) => {
  app.use((error, req, res, next) => {
    const status = error.status || 500
    console.log(error)
    res.status(500).send({
      code: 'Exception',
      status,
      message: error.message,
      fa_message: 'خطایی رخ داده است'
    })
  })
}
