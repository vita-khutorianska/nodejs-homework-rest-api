const {
  getContact,
  getContactById,
  deleteContact,
  addContact,
  updateContact,
  updateStatusContact,
} = require("../service/contactService");

const getContactControler = async (req, res, next) => {
  const user = await getContact();
  res.status(200).json({ status: "ok", user });
};

module.exports = { getContactControler };
