const router = require("express").Router()


//Accept header practice:
router.get("/accept",(req,res,next)=>{
if (!req.accepts('application/json')) {//checks if the Accept header contains 'application/json'
    res.set('Content-Type', 'text/plain');
    // res.set('Content-Encoding - gzip')//if the content sent was compressed in gaip we would use this
    return  res.status(406).send("Not acceptable,server can only send json")
}
next()
}
,(req,res)=>{
res.json({
method:"GET",
message:"Accept header checking is working,Nice job"
})
})


//Content-type practice
router.post("/content",(req,res,next)=>{
if (req.headers["content-type"]!=="application/json") {
   return res.status(415).json({
        method:"POST",
        message:"Unsuporrted media type,server only expects json in the req",
    })
}
next()
},(req,res)=>{
    res.set({
      "Cache-Control": "public, max-age=30"//caches the response in the browser
    }).status(201).json({
    method:"POST",
    message:"Content-type header checking is working,Keep going"
})
})



module.exports = router