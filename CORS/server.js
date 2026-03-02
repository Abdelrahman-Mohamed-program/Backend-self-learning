require("dotenv").config()

const express = require("express"),
 app = express(),
 port = process.env.PORT

//middlewares 
app.use(express.json())


// the browser caches responses on his own
app.use((req,res,next)=>{
    res.set({
        "Cache-Control" : "no-store"
    }
    )

    next()
})






//CORS practice:




//1) practices without using CORS

// No CORS at all test:
app.get("/",(req,res,next)=>{

    res.status(200).json({
        method:"GET",
        message:"Came from server"
    })
    next()
    //won't allow any origin to access any response until we use access-control-allow-origin header
})





//only origin CORE test:
/*Important Note : 
   first of all, all the other main CORS except(expose headers) are for preflight request which uses the OPTIONS method so we need to handle it first
*/

app.use((req,res,next)=>{
res.set({"Access-Control-Allow-Origin":"*",
})
next()
})

app.get("/boody",(req,res)=>{//simple request
     res.status(200).json({
        method:"GET",
        message:"Came from server"
    })
    // this will work and the response will be sent because it is a simple request and simple requests only need origin access
})

app.put("/",(req,res)=>{//trigger preflight request
    console.log("request came here");
    res.status(200).json({
        method:"PUT",
        message:"Came from server"
    })
    //but for this origin access is not enough because preflight request checks all the CORS not just the origin one and this request triggers preflight because of the put method
})







// origin + method CORS test : 
// Note : now as we will use other CORS headers than allow-origin we must handle them inside the OPTIONS method cause as we said they are only for preflight requests

// app.options("/*any",(req,res,next)=>{
//     res.set({
//         "Access-Control-Allow-Methods" : "PUT",
//     })
    
//     res.status(204).json({
//         "method":"OPTIONS",
//         "message":"this is preflight response to get the real request"
//     })
// })

app.put("/boody",(req,res)=>{//trigger preflight request
    res.status(200).json({
        method:"PUT",
        message:"Came from server",
    })
    //this will work but only if the put request didn't have none save headers like contenttype json
})


/* Note: for Post and GET methods the things that trigger the preflight request is the only things that the CORS check for
          in other words if a post request trigired preflight request because of the headers then the preflight request will only check the headers
          (and the origin of course) it won't check the allowed methods but it still safer to include the methods anyway*/

app.post("/boody",(req,res)=>{//post req with costum unsafe headers to trigger preflight request
   res.status(200).json({
        method:"POST",
        message:"won't work because preflight response did not allow the headers",
    })
})






// Origin + headers + perflight methods test:

//this should allow and send everything unless you forget to allow anything used in the request


app.use((req,res,next)=>{
     if (req.method=="OPTIONS") {
        res.set({
      "Access-Control-Allow-Methods" : "PUT,DELETE",//no need to add get and post they already do not trigger preflight request
      "Access-Control-Allow-Headers" :"*"//now every single request header will be allowed
    })
    res.sendStatus(204)
     }

     next()
})


app.get("/final",(req,res)=>{//trigering preflight request
 res.status(200).json({
    method:"GET",
    message:"this will work because all headers are allowed"
 })
})

app.post("/final",(req,res)=>{//trigering preflight request
 res.status(200).json({
    method:"POST",
    message:"this will work because all headers are allowed"
 })
})


app.put("/final",(req,res)=>{
 res.status(200).json({
    method:"PUT",
    message:"this will work because all headers are allowed and we allowed the put method",
 })
})


app.delete("/final",(req,res)=>{
 res.status(200).json({
    method:"DELETE",
    message:"this will work because all headers are allowed and we allowed the DELETE method",
 })
})



app.listen(port,()=>{
    console.log("server is running on port : ",port);
})