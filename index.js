const express=require("express")
const { connection } = require("./config/db")
const {productRoute} = require('./routes/product.js')
const { userRouter } = require("./routes/user")
const{cartRoute} = require('./routes/cart.js')
const {CartAuthentication} = require('./middlewares/Cartauth.js')
const cors= require("cors")
require("dotenv").config();

const app= express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
  res.send("HOME PAGE")
})

app.use("/users",userRouter)
app.use('/product',productRoute)
app.use('/cart',cartRoute)


app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log("connected to the db");
  } catch {
    console.log("can not connect to the db");
  }

  console.log("server is running at port", process.env.PORT);
});