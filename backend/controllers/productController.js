const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//create product - admin
exports.createProduct = catchAsyncErrors(
     async(req, res, next) => {
          const product = await Product.create(req.body)
     
          res.status(200).json({
               success: true,
               product
          })
     }
)

//get all products
exports.getAllProducts = catchAsyncErrors(
     async(req, res) => {

          const products = await Product.find()
     
          res.status(200).json({
               success: true,
               products
          })
     }
)

//get product details
exports.getProductDetails = catchAsyncErrors(
     async(req, res, next) => {

          const product = await Product.findById(req.params.id)
     
          if(!product){
               return next(new ErrorHandler(404, "Product Not found"))
          }
     
          res.status(200).json({
               success: true,
               product
          })
     }
)

//update product - admin
exports.updateProduct = catchAsyncErrors(
     async(req, res, next) => {
     
          let product = await Product.findById(req.params.id)
     
          if(!product){
               return next(new ErrorHandler(404, "Product Not found"))
          }
     
          product = await Product.findByIdAndUpdate(req.params.id, req.body, {
               new: true,
               runValidators: true,
               useFindAndModify: true
          })
     
          res.status(200).json({
               success: true,
               product
          })
     }
)

//delete product - admin
exports.deleteProduct = catchAsyncErrors(
     async(req, res, next) => {

          const product = await Product.findById(req.params.id)
     
          if(!product){
               return next(new ErrorHandler(404, "Product Not found"))
          }
     
          await product.remove()
     
          res.status(200).json({
               success: true,
               message: "Product deleted successfully"
          })
     } 
)