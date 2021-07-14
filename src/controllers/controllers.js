const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../service/contactService')

const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user
  const allContacts = await getContact(userId)
  res.status(200).json(allContacts)
}

const getContactByIdController = async (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.user
  const contact = await getContactById(id, userId)
  res.status(200).json(contact)
}
const deleteContactController = async (req, res, next) => {
  const { id } = req.params
  await deleteContact(id)
  res.status(200).json({
    message: `Contact with ID ${id} successfully deleted`
  })
}

const addContactController = async (req, res, next) => {
  const formData = req.body
  const { _id: userId } = req.user
  const newContact = await addContact(formData, userId)
  res.status(200).json({
    message: `Contact ${newContact._id} successfully added`
  })
}

const updateContactController = async (req, res, next) => {
  const formData = req.body
  const { _id: userId } = req.user
  const { id } = req.params

  await updateContact(id, formData, userId)
  res.status(200).json({
    message: `Contact with ID '${id}' successfully updated`
  })
}

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.user
  const { favorite } = req.body
  const client = await updateStatusContact(id, { favorite }, userId)
  if (client) {
    return res.status(200).json(`client with ${id} update favorite status`)
  }
  return res.status(404).json({
    message: `Not found contact id: ${id}`,
    data: 'Not Found'
  })
}

module.exports = {
  getContactsController,
  getContactByIdController,
  deleteContactController,
  addContactController,
  updateContactController,
  updateStatusContactController
}
