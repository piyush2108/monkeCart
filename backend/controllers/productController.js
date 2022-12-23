const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ApiFeatures = require('../utils/apiFeatures')

//create product - admin
exports.createProduct = catchAsyncErrors(
     async(req, res, next) => {
          req.body.user = req.user.id

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

          const resultPerPage = 3
          const productCount = await Product.countDocuments()

          const apiFeature = new ApiFeatures(Product.find(), req.query)
          .search()
          .filter()
          .pagination(resultPerPage)
               
          const products = await apiFeature.query
     
          res.status(200).json({
               success: true,
               products,
               productCount
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

//create and update product review
exports.createProductReview = catchAsyncErrors(
     async(req, res, next) => {

          const {rating, comment, productId} = req.body
          const review = {
               user: req.user._id,
               name: req.user.name,
               rating: Number(rating),
               comment
          }

          const product = await Product.findById(productId)

          const isReviewed = product.reviews.find((rev) => rev.user.toString() === req.user._id.toString())

          if(isReviewed){
               product.reviews.forEach((rev) => {
                    if(rev.user.toString() == req.user._id.toString()){
                         rev.rating = rating
                         rev.comment = comment
                    }
               })
          }else{
               product.reviews.push(review)
               product.noOfReviews = product.reviews.length
          }

          if(product.ratings === 0){
               product.ratings = req.body.rating
          }else{
               product.ratings = (product.ratings + req.body.rating )/ 2
          }

          await product.save({
               validateBeforeSave: false
          })

          res.status(200).json({
               success: true,
          })
     }
)

//get all reviews of a product
exports.getProductReviews = catchAsyncErrors(
     async(req, res, next) => {
          const product = await Product.findById(req.query.productId)

          if(!product){
               return next(new ErrorHandler(404, "Product not found"))
          }

          res.status(200).json({
               success: true,
               reveiws: product.reviews
          })
     }
)

//delete a review
exports.deleteProductReview = catchAsyncErrors(
     async(req, res, next) => {
          const product = await Product.findById(req.query.productId)

          if(!product){
               return next(new ErrorHandler(404, "Product not found"))
          }

          const reviews = product.reviews.filter( rev => rev._id.toString() != req.query.id.toString())

          let avg = 0
          reviews.forEach((rev) => {
               avg += rev.rating
          })

          const ratings = avg / reviews.length
          const noOfReviews = reviews.length

          await Product.findByIdAndUpdate(req.query.productId, {
               reviews,
               ratings,
               noOfReviews
          }, {
               new: true,
               runValidators: true,
               useFindAndModify: false
          })

          res.status(200).json({
               success: true
          })
     }
)