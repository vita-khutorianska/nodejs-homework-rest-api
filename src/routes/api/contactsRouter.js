const express = require('express')
const router = express.Router()

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
router.get('/', getContactsController)
router.get('/:id', getContactByIdController)
router.post('/', validationData, addContactController)
router.delete('/:id', deleteContactController)
router.put('/:id', updateContactValidation, updateContactController)
router.patch(
  '/:id/favorite',
  updateStatusContactValidation,
  updateStatusContactController
)

module.exports = router
