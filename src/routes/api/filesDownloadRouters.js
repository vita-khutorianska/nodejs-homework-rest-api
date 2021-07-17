const express = require('express')
const path = require('path')
const AVATARS_DIR = path.join('./public/avatars')
const router = express.Router()
router.use('/download', express.static(AVATARS_DIR))
module.exports = router
