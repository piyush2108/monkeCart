const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticated = catchAsyncErrors(
     async(req, res, next) => {
          const { token } = req.cookies

          if(!token){
               return next(new ErrorHandler(401, "Please login to access"))
          }
          const decodedData = jwt.verify(token, process.env.JWT_SECRET)

          req.user = await User.findById(decodedData.id)
          next()
     }
)

exports.authorizeRoles = (...roles) => {
     return (req, res, next) => {
          if(!roles.includes(req.user.role)){
               return next(new ErrorHandler(403, `Role: ${req.user.role} doesn't have access for this action`))
          }
     
          next()
     }
}