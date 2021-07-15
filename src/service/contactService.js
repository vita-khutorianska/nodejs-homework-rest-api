const { Contact } = require('../db/contactModel')
const { NotAuthorized } = require('../helpers/errors')

const getContact = async (userId) => {
  return await Contact.find({ owner: userId }).select({ __v: 0 })
}
const getContactById = async (userId, id) => {
  if (!userId) {
    throw new NotAuthorized('Not authorized')
  }
  return await Contact.findById({ owner: userId, _id: id })
}
const addContact = async ({ name, email, phone, userId }) => {
  const newClient = new Contact({
    name,
    email,
    phone,
    owner: userId
  })
  return await newClient.save()
}

const updateContact = async (id, { name, email, phone }, userId) => {
  const client = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { $set: { name, email, phone } }
  )
  return client
}

const updateStatusContact = async (id, userId, { favorite }) => {
  const updateClient = await Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { $set: { favorite } },
    { new: true }
  )
  return updateClient
}
const deleteContact = async (id, userId) => {
  return await Contact.findByIdAndRemove({ _id: id, owner: userId })
}

module.exports = {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact
}
