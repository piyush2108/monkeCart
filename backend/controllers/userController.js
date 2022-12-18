const User = require('../models/userModel')
const catchAsyncEroor = require('../middleware/catchAsyncErrors')
const EroorHandler = require('../utils/errorHandler')


//register user
exports.registerUser = catchAsyncEroor(
     async(req, res, next)=>{
          const { name, email, password } = req.body

          const user = await User.create({
               name, email, password,
               avatar:{
                    public_id: "sample public id",
                    url: "sample url"
               }
          })

          res.status(201).json({
               success: true,
               user 
          })
     }
)