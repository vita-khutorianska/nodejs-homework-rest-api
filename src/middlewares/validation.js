const Joi = require('joi')

const checkValidation = (schema, req, res, next) => {
  const validationResult = schema.validate(req.body)
  if (validationResult.error) {
    return res.status(400).json({ status: validationResult.error.message })
  }
  next()
}

const validationData = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    phone: Joi.string().min(7).max(10).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required()
  })
  checkValidation(schema, req, res, next)
}
const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2 }),
    phone: Joi.string().min(7).max(14)
  }).min(1)
  checkValidation(schema, req, res, next)
}
const updateStatusContactValidation = (req, res, next) => {
  const schema = Joi.object({
    favorite: Joi.boolean().required()
  })
  checkValidation(schema, req, res, next)
}
const authorizationValidation = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2
      })
      .required()
  })
  checkValidation(schema, req, res, next)
}
const subscriptionValidation = (req, res, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business').required()
  })
  checkValidation(schema, req, res, next)
}
module.exports = {
  validationData,
  updateContactValidation,
  updateStatusContactValidation,
  authorizationValidation,
  subscriptionValidation
}
