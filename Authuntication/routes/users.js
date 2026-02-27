const router  = require("express").Router()

//sign up logic
const signupCheck = require("../middlewares/signupCheck")
const {signup,login} = require("../controllers/users.controller")
router.post("/signup",signupCheck,signup)

//login logic
const loginCheck = require("../middlewares/loginCheck")
router.get("/login",loginCheck,login,(req,res)=>{
    
})


module.exports = router