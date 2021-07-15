const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact
} = require('../service/contactService.js')

const getContactsController = async (req, res, next) => {
  const { _id: userId } = req.user
  try {
    const client = await getContact(userId)
    res.status(200).json({ client })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const getContactByIdController = async (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.user
  console.log('userId', userId)
  try {
    const client = await getContactById(id, userId)
    if (!client) {
      return res.status(404).json(`There are no client with ${id} in db!`)
    }
    return res.status(200).json({ client })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const addContactController = async (req, res, next) => {
  const { name, email, phone, favorite } = req.body
  const { _id: userId } = req.user
  try {
    const client = await addContact({ name, email, phone, favorite, userId })
    return res.status(200).json({ status: 'contact added', client })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
const deleteContactController = async (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.user
  try {
    await deleteContact(id, userId)
    res.status(200).json({
      status: 'deleted success'
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateContactController = async (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.user
  const { name, email, phone } = req.body
  try {
    const client = await updateContact(id, { name, email, phone }, userId)
    if (client) {
      res.status(200).json(`client with ${id} update`)
    }
    res.status(404).json({
      message: `Not found client id: ${id}`,
      data: 'Not Found'
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateStatusContactController = async (req, res, next) => {
  const { id } = req.params
  const { _id: userId } = req.user
  const { favorite } = req.body
  try {
    const client = await updateStatusContact(id, { favorite }, userId)
    if (client) {
      return res.status(200).json(`client with ${id} update favorite status`)
    }
    return res.status(404).json({
      message: `Not found client id: ${id}`,
      data: 'Not Found'
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController
}
