
const express = require('express')
const cartRoute = express.Router()
const {cartModel} = require('../models/Cart.model.js')
const {CartAuthentication} = require('../middlewares/Cartauth.js')

//get___________________
cartRoute.get('/',CartAuthentication,async(req,res)=>{
    let cartuser = req.body.user
    try{
        let data = await cartModel.find({user:cartuser})
        res.send(data)
    }catch(err){
        res.send({'err':err.message})
    }
})


//admin side cart---------------------
cartRoute.get('/getallcart',async(req,res)=>{
    let query = req.query
    try{
        let data = await cartModel.find(query)
        res.send(data)
    }catch(err){
        res.send({'err':err.message})
    }
})

//addtocart______________________
cartRoute.post('/addtocart',CartAuthentication,async(req,res)=>{
    let product = req.body;
    try{
       let item = await cartModel.find({ productName:product.productName,user:product.user})
       if(item.length > 0){
        res.send({sug:'Product is present in cart already'})
       }else{
        let data = new cartModel(product)
        await data.save()
         res.send({msg:'product added to cart'})
       }
    }catch(err){
        res.send({'err':err.message})
    }
})


//update___________________________cd
cartRoute.patch('/updatecart/:id',CartAuthentication,async(req,res)=>{
    let id = req.params.id
    try{
    let item = await cartModel.findOneAndUpdate({_id:id,user:req.body.user},{quantity:req.body.value})
        res.send(item)
    }catch(err){
        res.send({'err':err.message})
    }
})

//delete________________________________
cartRoute.delete('/deletecart/:id',CartAuthentication,async(req,res)=>{
    let id = req.params.id
    let user = req.body.user
    try{
        await cartModel.findOneAndDelete({_id:id,user})
        res.send({msg:'product removed prom cart'})
    }catch(err){
        res.send({'err':err.message})
    }
})

module.exports={cartRoute}