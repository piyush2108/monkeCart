const express = require('express')
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController.js')
const { isAuthenticated, authorizeRoles } = require('../middleware/auth.js')

const router = express.Router()

router.route("/products").get(getAllProducts)
router.route("/products/new").post(isAuthenticated, authorizeRoles("admin"), createProduct)
router.route("/products/:id").get(getProductDetails)
router.route("/products/:id").put(isAuthenticated, authorizeRoles("admin"), updateProduct)
router.route("/products/:id").delete(isAuthenticated, authorizeRoles("admin"), deleteProduct)

module.exports = router