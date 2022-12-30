const express = require('express')
const { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth')

const router = express.Router()

router.route("/order/new").post(isAuthenticated, newOrder)
router.route("/order/me").get(isAuthenticated, myOrders)
router.route("/order/:id").get(isAuthenticated, getSingleOrder)
router.route("/admin/orders").get(isAuthenticated, authorizeRoles("admin"), getAllOrders)
router.route("/admin/order/:id").put(isAuthenticated, authorizeRoles("admin"), updateOrder)
router.route("/admin/order/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteOrder)

module.exports = router