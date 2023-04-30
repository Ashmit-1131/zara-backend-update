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
  const { email, password, name, address, locality, state, phone, repeatPassword, pincode, moreInfo, city, country } = req.body;

  try {
    if (password !== repeatPassword) {
      return res.status(400).json({ error: 'Password and Repeat Password do not match' });
    }
    let user = await UserModel.find({ email });

    if (user.length === 0) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          console.log(err);
        } else {
          const User = new UserModel({
            email,
      password,
      name,
      address,
      locality,
      state,
      phone,
      repeatPassword,
      pincode,
      moreInfo,
      city,
      country
         
           
          });
          await User.save();
          console.log(User);
          res.send("Successfully Registered ! Please Login !!");
        }
      });
    } else {
      res.send("Already Registerd ! Please Login !");
    }
  } catch (err) {
    res.send(err);
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
    return res.send({error:"User not found"});
    } 
    if(user.password!==password){
      return res.send({error:"Wrong Password"});
    }
    
    
      res.send({message:"Login Successful !"});
 
  } catch (err) {
    res.send({error:"Internal server error"});
  }
});

module.exports = {
  userRouter,
};