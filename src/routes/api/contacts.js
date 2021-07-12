const express = require("express");
const router = express.Router();
const { asyncWrapper } = require("../../helpers/apiHelpers");

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  deleteContactController,
  updateContactController,
  updateStatusContactController,
} = require("../../controllers/controllers");
const {
  validationData,
  updateContactValidation,
  updateStatusContactValidation,
} = require("../../middlewares/validation");

router.get("/", asyncWrapper(getContactsController));
router.get("/:id", getContactByIdController);
router.post("/", validationData, addContactController);
router.delete("/:id", deleteContactController);
router.put("/:id", updateContactValidation, updateContactController);
router.patch(
  "/:id/favorite",
  updateStatusContactValidation,
  updateStatusContactController
);

module.exports = router;
