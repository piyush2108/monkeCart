const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
     name:{
          type: String,
          required: [true, "Please enter product name"],
          trim: true
     },

     description:{
          type: String,
          required: [true, "Please enter product description"],
          trim: true
     },

     price: {
          type: Number,
          required: [true, "Please enter product price"],
          maxLength: [8, "Price can't exceed a certain limit"]
     },

     ratings: {
          type: Number,
          default: 0
     },

     images: [
          {
               public_id: {
                    type: String,
                    required: true
               },
               url: {
                    type: String,
                    required: true
               }
          }
     ],

     category: {
          type: String,
          required: [true, "Please enter category for product"]
     },

     stock: {
          type: Number,
          required: [true, "Please enter stock for product"],
          maxLength: [4, "Stock can't exceed a certain limit"]
     },

     noOfReviews: {
          type: Number,
          default: 0
     },

     reviews: [
          {
               name: {
                    type: String,
                    required: true
               },
               rating: {
                    type: Number,
                    required: true
               },
               comment:{
                    type: String,
                    required: true
               }
          }
     ],

     createdAt: {
          type: Date,
          default: Date.now()
     }
})


module.exports = mongoose.model("Product", productSchema)