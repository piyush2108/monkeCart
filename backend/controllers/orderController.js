const Order = require('../models/orderModel')
const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')

//create new order
exports.newOrder = catchAsyncErrors(
     async(req, res, next) => {
          
          const {
               shippingInfo,
               orderItems,
               paymentInfo,
               itemsPrice,
               taxPrice,
               shippingPrice,
               totalPrice
          } = req.body

          const order = await Order.create({
               shippingInfo,
               orderItems,
               paymentInfo,
               itemsPrice,
               taxPrice,
               shippingPrice,
               totalPrice,
               paidAt: Date.now(),
               user: req.user._id
          })

          res.status(200).json({
               success: true,
               order
          })
     }
)

//get single ordre
exports.getSingleOrder = catchAsyncErrors(
     async(req, res, next) => {

          const order = await Order.findById(req.params.id).populate(
               "user",
               "name email"
          )

          if(!order){
               return next(new ErrorHandler(404, "Order not found with this Id"))
          }

          res.status(200).json({
               success: true,
               order
          })
     }
)

//get orders of logged in user
exports.myOrders = catchAsyncErrors(
     async(req, res, next) => {

          const orders = await Order.find({ user: req.user._id})

          res.status(200).json({
               success: true,
               orders
          })
     }
)

//get all orders - admin
exports.getAllOrders = catchAsyncErrors(
     async(req, res, next) => {

          const orders = await Order.find()

          let totalAmount = 0
          orders.forEach((order) => {
               totalAmount += order.totalPrice
          })

          res.status(200).json({
               success: true,
               totalAmount,
               orders
          })
     }
)

//update order status - admin
exports.updateOrder = catchAsyncErrors(
     async(req, res, next) => {

          const order = await Order.findById(req.params.id)

          if(order.orderStatus === "Delivered"){
               return next(new ErrorHandler(404, "You have already delivered this order"))
          }

          res.status(200).json({
               success: true,
          })
     }
)