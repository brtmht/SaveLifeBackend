const jwt= require('jsonwebtoken')
const User= require('../models/user')

const verifyToken = (req, res, next) => {
    try {
    // console.log("-----------",req.cookies.jwt)
    const token=req.cookies.jwt;
    // let token = req.headers.cookie
    // let tokenh = token.split("=")
    // console.log("----------",tokenh[0])
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded,"decoded");
  
      if (!token) {
        return res.status(403).json("A token is required for authentication");
      }
  
      req.user = decoded;
      // console.log(req.user)
        return next();

  
    } catch (err) {
      console.log(err)
      return res.status(401).json({err});
    }
  };
  
  module.exports = verifyToken;