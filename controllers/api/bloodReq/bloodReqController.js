const BloodRequest= require("../../../models/requestBlood")
const User=require("../../../models/user")
const httpStatus = require('http-status');
var moment = require('moment');


exports.create= async(req,res)=>{
try{
const user= await User.findOne({_id:req.params.id},['_id','name','email','contact']);
if(!user){return res.status(httpStatus.NOT_FOUND).json({error:"data not found"})}

return res.status(httpStatus.OK).json(user)
}catch(err)
{
    console.log(err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:"Something went wrong"});
}
},
exports.requestBlood= async(req,res)=>{
    try{
        let reqiured_upto=moment(req.body.required_upto).toDate()
        if(reqiured_upto<=new Date()) return res.json({message:"Please insert a valid date"})

        let bloodSeeker= await BloodRequest.create({
            type:req.body.type.toLowerCase(),
            patient_name:req.body.patient_name,
            patient_age:req.body.patient_age,
            bloodgroup:req.body.bloodgroup.toUpperCase(),
            bloodunit:req.body.bloodunit,
            required_upto:reqiured_upto,
            hospital:req.body.hospital,
            userId:req.body.userId,
            user_name:req.body.user_name,
            contact:req.body.contact,
            weight:req.body.weight,
            location:req.body.locaton
        })
        if(!bloodSeeker){return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: "something went wrong" });}
return res.status(httpStatus.CREATED).json({ bloodSeeker, message: "Information registered sucessfully" })

    }
    catch(err){
        console.log("========",err)
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:"Something went wrong"})
    }
}