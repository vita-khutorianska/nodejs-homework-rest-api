const { NotAuthorized } = require('../helpers/errors')
const jwt = require('jsonwebtoken')
const { User } = require('../db/userModel')

const authMiddleware = async (req, res, next) => {
  const [, token] = req.headers.authorization.split(' ')
  if (!token) {
    next(new NotAuthorized('Not authorized'))
  }
  try {
    const user = jwt.decode(token, process.env.JWT_SECRET)
    const userExist = await User.findOne({ _id: user._id })
    if (!userExist) {
      next(new NotAuthorized('Not authorized'))
    }
    if (userExist.token !== token) {
      next(new NotAuthorized('Not authorized'))
    }
    req.user = userExist
    req.token = token
    next()
  } catch (err) {
    next(new NotAuthorized('Invalid token'))
  }
}

module.exports = {
  authMiddleware
}
