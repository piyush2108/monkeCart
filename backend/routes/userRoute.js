const express = require('express')
const router = express.Router()
const { registerUser, viewUsers, loginUser, logoutUser } = require('../controllers/userController')

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/logout").get(logoutUser)

module.exports = router