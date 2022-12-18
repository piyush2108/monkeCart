const mongoose = require('mongoose')
const validator = require('validator')

const userSchema = new mongoose.Schema({
     name:{
          type: String,
          required: [true, "Please enter name"],
          maxLength: [30, "Name cannot exceed 40 characters"],
          minLength: [4, "Name should have more than 4 characters"]
     },

     email:{
          type: String,
          required: [true, "Please enter email"],
          unique: true,
          validate: [validator.isEmail, "Please enter valid email"]
     },

     password:{
          type: String,
          required: [true, "Please enter password"],
          minLength: [8, "Passwords should contain more than 8 characters"],
          select: false
     },

     avatar: {
          public_id:{
               type: String,
               required: true
          },
          url:{
               type: String,
               required: true
          }
     },

     role: {
          type: String,
          default: "user"
     },

     resetPasswordToken: String,
     resetPasswordExpire: Date
})

module.exports = mongoose.model("User", userSchema)