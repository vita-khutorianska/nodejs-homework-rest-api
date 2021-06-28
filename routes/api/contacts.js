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
const {
  validationData,
  patchValidation,
} = require("../../middlewares/validation");

router.get("/:contactId", getContactId);

router.post("/", postContacts, validationData);

router.delete("/:contactId", deleteContact);

router.patch("/:contactId", patchContact, patchValidation);

module.exports = router;
