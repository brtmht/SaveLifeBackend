var express = require('express');
var fbPassport=require('../../../middlware/passport')
var googleLogin=require('../../../middlware/googlelogin')
const authRoutes = express.Router();
const authController = require('./authController');
const verifyToken= require('../../../middlware/auth')

authRoutes.post('/register',authController.register)
authRoutes.get("/login",authController.login)
authRoutes.post('/forgetpassword',authController.forgetPassword)
authRoutes.post('/password_reset',authController.resetPassword)
authRoutes.post('/verifyemailsend',authController.verifyEmailSend)
authRoutes.post('/emailverified',authController.verifyEmailResponse)
authRoutes.post('/logout',verifyToken,authController.logout)

authRoutes.get('/profile', (req, res) => { res.send("you are authenticated") })
authRoutes.get('/loginerror', (req, res) => { res.send("you are not authenticated") })

authRoutes.get('/facebook', fbPassport.authenticate('facebook'));
authRoutes.get('/facebook/secrets',fbPassport.authenticate('facebook', {successRedirect: '/api/auth/profile',failureRedirect: '/api/auth/loginerror'}));

authRoutes.get('/google',googleLogin.authenticate('google', { scope : ['profile', 'email'] }));
authRoutes.get('/google/callback',googleLogin.authenticate('google', {successRedirect: '/api/auth/profile',failureRedirect: '/api/auth/loginerror' }));

authRoutes.post("/phoneotp",authController.sendOtp)
authRoutes.post("/verifyotp",authController.verifyOtp)

authRoutes.get("/token",verifyToken,function(req,res){
    try{
        console.log("token verified")
        return res.status(200).json({message:"token verified sucessfully"})
    }catch(err){console.log(err)}
})


module.exports=authRoutes;