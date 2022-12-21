const User = require('../models/userModel')
const crypto = require('crypto')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')
const sendEmail = require('../utils/sendEmail')
const { use } = require('../routes/userRoute')

//register user
exports.registerUser = catchAsyncErrors(
     async(req, res, next) => {
          const { name, email, password } = req.body

          const user = await User.create({
               name, 
               email, 
               password,
               avatar:{
                    public_id: "sample public id",
                    url: "sample url"
               }
          })

          sendToken(user, 201, res)
     }
)

//user login
exports.loginUser = catchAsyncErrors(
     async(req, res, next) => {
          const {email, password} = req.body

          //checking if user has given both email and password
          if(!email || !password){
               return next(new ErrorHandler(400, "Please enter both email and password"))
          }

          const user = await User.findOne({email}).select("+password")

          if(!user){
               return next(new ErrorHandler(401, "Invalid email or password"))
          }

          const isPasswordMatched = user.comparePassword(password)
          if(!isPasswordMatched){
               return next(new ErrorHandler(401, "Invalid email or password"))
          }

          sendToken(user, 200, res)
     }
)

//user logout
exports.logoutUser = catchAsyncErrors(
     async(req, res, next) => {

          res.cookie("token", null, {
               expires: new Date(Date.now()),
               httpOnly: true
          })

          res.status(200).json({
               success: true,
               message: "Logged out"
          })
     }
)

//forgot password
exports.forgotPassword = catchAsyncErrors(
     async(req, res, next) => {
          const user = await User.findOne({email: req.body.email})

          if(!user){
               return next(new ErrorHandler(404, "User not found"))
          }

          //get reset password token
          const resetToken = user.getPasswordResetToken()

          await user.save({ validateBeforeSave: false })

          const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

          const message = `Your password reset token is :- \n\n ${resetPasswordUrl}\n If you have not requested for this please ignore`

          try {
               
               await sendEmail({
                    email: user.email,
                    subject: 'Ecommerce Password Recovery',
                    message: message
               })

               res.status(200).json({
                    success: true,
                    message: `Email send to ${user.email} successfully`
               })

          } catch (error) {
               user.resetPasswordToken = undefined
               user.resetPasswordExpire = undefined

               await user.save({ validateBeforeSave: false })

               return next(new ErrorHandler(500, error.message))
          }
     }
)

//reset password
exports.resetPassword = catchAsyncErrors(
     async(req, res, next) => {
          const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex")

          const user = await User.findOne({resetPasswordToken, resetPasswordExpire: { $gt: Date.now()}})

          if(!user){
               return next(new ErrorHandler(404, "Reset Password token is invalid or has been expired"))
          }

          if(req.body.password !== req.body.confirmPassword){
               return next(new ErrorHandler(400, "Passwords don't match"))
          }

          user.password = req.body.password
          user.resetPasswordToken = undefined
          user.resetPasswordExpire = undefined

          await user.save()

          sendToken(user, 200, res)
     }
)