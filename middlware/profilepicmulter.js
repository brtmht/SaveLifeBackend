const express = require('express');
const multer  = require('multer')



const userImageStorage= multer.diskStorage({
    destination:function(req, file, cb) {
        cb(null,'public/images/users')
    },
      filename: (req, file, cb) => {
          cb(null, file.originalname) 
    }
});
module.exports=userImageStorage