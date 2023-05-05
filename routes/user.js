const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User.model");

const userRouter = express.Router();

userRouter.use(express.json());

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.send(users);
  } catch (err) {
    res.send(err.message);
  }
});



userRouter.post("/register", async (req, res) => {
  const { email, password, name, address,  state, phone, pincode, city,  } = req.body;
try{
let check=await UserModel.find({email:email})
if(check.length>0){
  res.send({msg:"user Already registered you can login"})
}else{
  bcrypt.hash(password,3,async(err,hash)=>{
    if(err){
      res.send({'msg':err.message},'user not able to register')

    }else{
      let user=new UserModel({email, password:hash, name, address,  state, phone, pincode, city})
      await user.save()
      res.send({'msg':'Registered successfully please login!'})
    }
  })
}
}catch(err){
res.send({'msg':err.message})
}
})
 
   
    

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
try{
  const user = await UserModel.find({ email });
   if(user.length>0){
    bcrypt.compare(password,user[0].password,(err,result)=>{
      if(result){
        let token=jwt.sign({userId:user[0]._id},'zara')
        res.send({msg:'User Login Sucess!','name':user[0].name,"token":token})
      }else{
        console.log('wrong password')
      res.send({error:"Wrong Password"})
      }
    })
   }else{
    res.send({'msg':'user does not exist, Register first'})
   }
  
 

}catch(err){
res.send({msg:err.message})
}
})
   



module.exports = {
  userRouter,
};