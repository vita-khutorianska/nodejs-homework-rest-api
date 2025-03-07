const express = require('express')
const router = express.Router()
const { asyncWrapper } = require('../../helpers/apiHelpers')
const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController
} = require('../../controllers/contactsController.js')
const {
  validationData,
  updateContactValidation,
  updateStatusContactValidation
} = require('../../middlewares/validation.js')
const { authMiddleware } = require('../../middlewares/authMiddlware')

router.use(authMiddleware)
router.get('/', asyncWrapper(getContactsController))
router.get('/:id', asyncWrapper(getContactByIdController))
router.post('/', validationData, asyncWrapper(addContactController))
router.delete('/:id', asyncWrapper(deleteContactController))
router.put(
  '/:id',
  updateContactValidation,
  asyncWrapper(updateContactController)
)
router.patch(
  '/:id/favorite',
  updateStatusContactValidation,
  asyncWrapper(updateStatusContactController)
)

module.exports = router
