const express = require('express')
const { newOrder, myOrders, getSingleOrder } = require('../controllers/orderController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

router.route("/order/new").post(isAuthenticated, newOrder)
router.route("/order/me").get(isAuthenticated, myOrders)
router.route("/order/:id").get(isAuthenticated, getSingleOrder)

module.exports = router