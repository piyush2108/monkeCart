const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

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

userSchema.pre("save", async function(next){
     if(!this.isModified("password")){
          next()
     }

     this.password = await bcrypt.hashSync(this.password, 10)
})

//JWT token
userSchema.methods.getJWTToken = function(){
     return jwt.sign({id:this._id}, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRE
     })
}

//compare password
userSchema.methods.comparePassword = function(enteredPassword){
     return bcrypt.compareSync(enteredPassword, this.password)
}

//generating password reset token
userSchema.methods.getPasswordResetToken = function() {
     //generating token
     const resetToken = crypto.randomBytes(20).toString("hex")

     //hashing and adding resetPasswordToken to userSchema
     this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
     this.resetPasswordExpire = Date.now() + 15 * 60 * 1000

     return resetToken
}

module.exports = mongoose.model("User", userSchema)