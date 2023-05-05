const jwt = require('jsonwebtoken')

const CartAuthentication = (req,res,next) => {
     
     const token = req.headers.authorization ;
     delete req.body._id;
    if(token){
       jwt.verify(token,'zara',(err,decoded)=>{
       // console.log(decoded)
        if(decoded){
           req.body.user = decoded.userId
           req.body.quantity=1
           next()
        }else{
            req.send({'err':err})
        }
       })
    }else{
        res.send({'sug':'Please Login for Cart !'})
    }

}

module.exports = {CartAuthentication}