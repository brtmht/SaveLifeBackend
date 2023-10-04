const User= require("../../../models/user")
const httpStatus = require('http-status');


exports.edit= async(req,res)=>{
try{
const userDetail= await User.findOne({_id:req.params.id})
if(!userDetail){return res.status(httpStatus.NOT_FOUND).json({error:"data not found"})}
return res.status(httpStatus.OK).json(userDetail);
}
catch(err){
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:"something went wrong"})
}
},

exports.updateUser = async(req,res)=>{
    try{
        // console.log("---------",req.body.image)
        // console.log(req.file.filename)
        const user=	{
            name: req.body.name,
            // email: req.body.email,
            gender: req.body.gender,
            contact: req.body.contact,
            dob: req.body.dob,
            bloodgroup: req.body.bloodgroup,
            country: req.body.country,
            state: req.body.state,
            city: req.body.city,
            pin: req.body.pin,
            addressline: req.body.addressline
            }

        const userInfo= await User.findOneAndUpdate({_id:req.params.id},user,{upsert: true, new: true}).exec()
        if(!userInfo){return res.status(httpStatus.BAD_REQUEST).json({errror:"updation failed"})};
        return res.status(httpStatus.OK).json({userInfo,message:"data updated sucessfully"})
        
    }catch(err){
        console.log(err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:"something went wrong"})
    }
}
