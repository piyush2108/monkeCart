const express = require('express')
const router = express.Router()
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword, getUserDetails, updateUserPassword, updateProfile, getAllUsers, getSingleUser, updateUserRole, deleteUser } = require('../controllers/userController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/password/forgot").post(forgotPassword)
router.route("/password/reset/:token").put(resetPassword)
router.route("/logout").get(logoutUser)
router.route("/me").get(isAuthenticated, getUserDetails)
router.route("/password/update").put(isAuthenticated, updateUserPassword)
router.route("/me/update").put(isAuthenticated, updateProfile)
router.route("/admin/users").get(isAuthenticated, authorizeRoles("admin"), getAllUsers)
router.route("/admin/users/:id").get(isAuthenticated, authorizeRoles("admin"), getSingleUser)
router.route("/admin/user/:id").put(isAuthenticated, authorizeRoles("admin"), updateUserRole)
router.route("/admin/user/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteUser)

module.exports = router