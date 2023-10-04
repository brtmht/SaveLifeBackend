var express = require('express')
const bloodReqController= require("./bloodReqController")
var bloodReqRoute = express.Router();

bloodReqRoute.get("/request/:id",bloodReqController.create)
bloodReqRoute.post("/request",bloodReqController.requestBlood)



module.exports=bloodReqRoute