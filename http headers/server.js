const express = require("express")

const app = express()



app.use(require("./routes/routes"))

app.listen(2005,(req,res)=>{
    console.log("server is running2");
    
})