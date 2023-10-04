var express = require('express')
const plasmaController= require("./plasmaController")
var plasmaRoute = express.Router();

plasmaRoute.post("/registration",plasmaController.registration)
plasmaRoute.post("/request",plasmaController.request)



module.exports=plasmaRoute