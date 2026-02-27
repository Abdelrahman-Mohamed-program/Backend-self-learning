const userModel = require("../models/user")
const bcrypt = require("bcrypt")

const loginCheck = async (req,res,next)=>{    
      if (!req.body||!req.body.email) {
      return res.status(400).json({
        method : "POST",
        message:"Bad request, EMAIL IS REQUIRED",
       })
    }

    if (!req.body.password) {
        return res.status(400).json({
        method : "POST",
        message:"Bad request, password IS REQUIRED",
       })
    }

const user = await userModel.findOne({ email: req.body.email });
  if (!user) {
    return res.status(401).json({
      method: "POST",
      message: "Unauthorized, user is not registered",
    });
  }

  const passwordCheck = await bcrypt.compare(req.body.password,user.password)
  
  if (!passwordCheck) {
     return res.status(401).json({
      method: "POST",
      message: "Unauthorized, Wrong passwrod",
    });
  }
  req.user = user
    next()
}


module.exports = loginCheck