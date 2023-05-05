const express= require('express')

const mongoose = require('mongoose')

const cartSchma = mongoose.Schema({
    imageURL:{type:String,required:true},
    productName:{type:String,required:true},
    price:{type:String,required:true},
    strikedPrice:{type:String,require:true},
    itemGender:{type:String,required:true},
    itemCategory:{type:String,required:true},
    sale:{type:String,required:true},
    user:{type:String,required:true},
    age:{type:String},
    quantity:{type:Number}
})


const cartModel = mongoose.model('cart',cartSchma)

module.exports = {cartModel}