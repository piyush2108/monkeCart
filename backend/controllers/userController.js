const User = require('../models/userModel')
const catchAsyncErrors = require('../middleware/catchAsyncErrors')
const ErrorHandler = require('../utils/errorHandler')
const sendToken = require('../utils/jwtToken')


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