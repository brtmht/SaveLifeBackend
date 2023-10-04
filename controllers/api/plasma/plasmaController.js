const plasmaUser=require("../../../models/plasmaUsers")
const PlasmaRequest= require("../../../models/plasmaReq")
const httpStatus = require('http-status');



exports.registration= async(req,res)=>{
try{

let uniqEmail = await plasmaUser.findOne({ email: req.body.email })
if (uniqEmail) { return res.status(httpStatus.NOT_ACCEPTABLE).json({ error: "Email Already Exist" }); }

let user= await plasmaUser.create({
    name:req.body.name,
    dob:req.body.dob,
    email:req.body.email,
    bloodgroup:req.body.bloodgroup.toUpperCase(),
    location:req.body.location,
    weight :req.body.weight,
    covid_test:req.body.covid_test,
    covid_symptoms:req.body.covid_symptoms,
    covid_vaccine:req.body.covid_vaccine
})
if (!user) {
    return res.status(httpStatus.BAD_REQUEST).json({ error: "something went wrong" });
  }
  return res.status(httpStatus.CREATED).json({ user, message: "Registration for Plasma done sucessfully" })

}catch(err){
    console.log("=============",err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:"Something went wrong"})

}
},

exports.request= async(req,res)=>{
    try{
    
    let plasmaRequest= await PlasmaRequest.create({
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
        bloodgroup:req.body.bloodgroup.toUpperCase(),
        location:req.body.location,
        weight :req.body.weight,
        tattoed:req.body.tattoed,
        hiv_test:req.body.hiv_test,
        covid_vaccine:req.body.covid_vaccine
    })
    if (!plasmaRequest) {
        return res.status(httpStatus.BAD_REQUEST).json({ error: "something went wrong" });
      }
  return res.status(httpStatus.CREATED).json({ plasmaRequest, message: "Registration for Plasma Request done sucessfully" })

    }catch(err){
        console.log("=============",err)
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({error:"Something went wrong"})

    }
    }

