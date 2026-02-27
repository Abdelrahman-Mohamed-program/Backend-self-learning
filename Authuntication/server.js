

require("dotenv").config()

//dependencies and modules
const express = require("express"),
  app = express(),
  port = process.env.PORT;

const tokenAuth = require("./middlewares/tokenAuth")  



//Routes, middlewares and config:
app.use(express.json())
app.use(tokenAuth);

const userRouter = require("./routes/users")
app.use(userRouter);









app.listen(port,(req,res)=>{
    console.log("Server is running on port " + port);
    
})

