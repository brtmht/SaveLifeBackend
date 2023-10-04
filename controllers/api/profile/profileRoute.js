const express= require("express")
const profileRoute=express.Router();
const profileController= require('./profileController')
const multer = require("multer")
const userImageStorage= require("../../../middlware/profilepicmulter")
const userImageUpload = multer({ storage: userImageStorage})


profileRoute.get("/edit/:id",profileController.edit)
profileRoute.post("/update/:id",profileController.updateUser)
// profileRoute.post("/update/:id",userImageUpload.single('image'),profileController.updateUser)

module.exports= profileRoute