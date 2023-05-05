const express = require("express")
const productRoute = express.Router()
const {productModel} = require ('../models/Product.model.js')


productRoute.get('/',async(req,res)=>{
    const query = req.query;
    let sorting;
    let skip;
    let setlimit;
    if(query.page ){
        // const { page = 1, limit = 6 } = req.query;
        // skip = (page - 1)*limit;
        // setlimit=limit
        delete query.page
        delete query.limit
    }
    //console.log(query)
    if(query.price){
        let range = [...query.price] //so that main qurey does not get affected 
         query.price={$gte:range[0],$lte:range[1]}
    }
    if(query.rating){
        let range = [...query.rating]
        query.rating={$gte:range[0]}
    }
    if(query.sort){
       if(query.sort === 'hightolow'){
        sorting={price:-1}
       }else if(query.sort === 'lowtohigh'){
        sorting={price:1}
       }
       delete query.sort
    }
  
    try{
    //   let data = await productModel.find(query).sort(sorting).skip(skip).limit(setlimit) //pagination 
    let data = await productModel.find(query).sort(sorting)
      
      res.send({data,Total:data.length})
    }catch(err){
        res.send({'msg':err.message})
    }
})


productRoute.get('/search/:key',async(req,res)=>{
    // console.log(req.params)
    try{
     let data = await productModel.find({
         "$or":[
             {'productName':{$regex:req.params.key,$options:'i'}},
             {'itemCategory':{$regex:req.params.key,$options:'i'}},
         ]
     })
     //$opt is for case sensetive
     res.send(data)
    }catch(err){
     res.send({'msg':err.message})
    }
 })

 //Addproduct _______________________________________
productRoute.post('/addproduct',async(req,res)=>{
    const payload = req.body
    try{                             //insertMany...[]required*****
        let item =await productModel.insertMany(payload)
       // await item.save()
        res.send('product get added')
    }catch(err){
        res.send({'msg':err.message})
    }
})

//update__________________________________
productRoute.patch('/update/:id',async(req,res)=>{
    let id = req.params.id;
    try{
       let product = await productModel.findOneAndUpdate({_id:id},req.body)
       // console.log(product)
        res.send({msg:'product get Updated!'})
    }catch(err){
        res.send({error:err.message})
    }
})

productRoute.patch('/update',async(req,res)=>{
    let query = req.query
    try{
        let product = await productModel.updateMany(query,req.body)
        console.log(product)
        res.send({msg:'product updated sucess!!'})
    }catch(err){
        res.send({'msg':err.message})
    }
})

//DeleteProduct___________________________________
productRoute.delete('/deleteproduct/:id',async(req,res)=>{
    let id = req.params.id
    try{
       await productModel.deleteOne({_id:id})
       res.send({'msg':'Product Removed !'})
    }catch(err){
        res.send({'msg':err.message})
    }
})


module.exports = {productRoute}