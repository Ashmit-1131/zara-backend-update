const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
 email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  address:{type:String,required:false} ,
  state: {type:String,required:false},
  phone: {type:Number,required:false},
  pincode: {type:Number,required:false},
   city: {type:String,required:false}
 
 
});

const UserModel = mongoose.model("user", userSchema);

module.exports = {
  UserModel,
};