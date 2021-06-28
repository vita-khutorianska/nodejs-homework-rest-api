const express = require("express");
const router = express.Router();
const {
  getContacts,
  getContactId,
  postContacts,
  deleteContact,
  putContact,
  patchContact,
} = require("../../controllers/contactsController");
router.get("/", getContacts);

router.get("/:contactId", getContactId);

router.post("/", postContacts);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId", patchContact);

module.exports = router;
