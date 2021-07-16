const {
  login,
  registration,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  userVerification,
  userVerificationResend
} = require('../service/authService')

const registrationController = async (req, res, next) => {
  const { email, password } = req.body
  await registration({ email, password })
  res.status(201).json({
    user: {
      email: email,
      password: password,
      subscription: 'starter'
    }
  })
  // json({ status: 'created' })
}
const userVerificationController = async (req, res, next) => {
  const { verificationToken } = req.params
  await userVerification(verificationToken)
  res.status(200).json({
    message: 'Verification successful'
  })
}

const userVerificationResendController = async (req, res, next) => {
  const { email } = req.body
  await userVerificationResend({ email })
  res.status(200).json({
    message: 'Verification email send'
  })
}
const loginController = async (req, res, next) => {
  const { email, password } = req.body
  const user = await login({ email, password })
  return res.status(200).json({ user })
}
const logoutController = async (req, res) => {
  const { userId } = req.user
  const token = req.token
  await logout({
    userId,
    token
  })

  res.status(204).json({ status: 'No Content' })
}
const getCurrentUserController = async (req, res, next) => {
  const token = req.token
  const { _id: userId } = req.user
  const currentUser = await getCurrentUser({ userId, token })
  return res.status(200).json({ currentUser })
}
const updateSubscriptionController = async (req, res, next) => {
  const token = req.token
  const { subscription } = req.body
  const { _id: userId } = req.user
  const currentUser = await updateSubscription({ token, subscription }, userId)
  res.status(200).json({ currentUser })
}
const avatarsController = async (req, res, next) => {
  const { file } = req
  const { _id: userId, avatarURL } = req.user
  const newPathAvatar = await updateAvatar({
    userId,
    file,
    avatarURL
  })
  res.status(200).json({
    Status: 'OK',
    ContentType: 'application/json',
    avatarURL: newPathAvatar
  })
}
module.exports = {
  registrationController,
  loginController,
  logoutController,
  getCurrentUserController,
  updateSubscriptionController,
  avatarsController,
  userVerificationController,
  userVerificationResendController
}
