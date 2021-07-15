const { NotAuthorized } = require('../helpers/errors')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  try {
    const [, token] = req.headers.authorization.split(' ')
    if (!token) {
      next(new NotAuthorized('Not authorized'))
    }
    const user = jwt.decode(token, process.env.JWT_SECRET)
    console.log('user', user)
    console.log('user._id ', user._id)
    const userExist = await User.findOne({ _id: user._id })
    console.log('userExist', userExist)
    if (!userExist) {
      next(new NotAuthorized('Not authorized'))
    }
    if (userExist.token !== token) {
      next(new NotAuthorized('Not authorized'))
    }
    console.log('req.user ', req.user)
    req.user = userExist
    req.token = token
    next()
  } catch (err) {
    console.log('err', err)
    next(new NotAuthorized('Invalid token'))
  }
}

module.exports = {
  authMiddleware
}
