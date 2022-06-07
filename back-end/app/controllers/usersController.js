const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const secret = 'test'

const singIn = async (req, res, next) => {
  const { email, password } = req.body
  try {
    const oldUser = await UserModel.findOne({ email })
    if (!oldUser) {
      return res.status(404).send({
        status: 404,
        message: 'user dose not exist'
      })
    }

    const isPasswordCorrect = bcrypt.compareSync(password, oldUser.password)
    if (!isPasswordCorrect) return res.status(400).send({ message: 'invalid credentials' })
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: '1h' })
    res.status(200).send({
      result: oldUser,
      token
    })
  } catch (error) {
    next(error)
  }
}

const singUp = async (req, res, next) => {
  const { email, password, firstName, lastName } = req.body
  try {
    const oldUser = await UserModel.findOne({ email })
    if (oldUser) {
      return res.status(400).send({
        success: false,
        status: 400,
        message: 'user already exists'
      })
    }
    const hashPassword = bcrypt.hashSync(password, 12)
    const result = await UserModel.create({
      email,
      password: hashPassword,
      name: `${firstName} ${lastName}`
    })
    const token = jwt.sign({ emali: result.email, id: result._id }, secret, { expiresIn: '3h' })
    res.status(201).send({
      result,
      token
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  singUp,
  singIn
}
